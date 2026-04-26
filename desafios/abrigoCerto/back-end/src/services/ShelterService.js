import bcrypt from 'bcrypt';
import { ShelterRepository } from '../repositories/ShelterRepository.js';
import { ShelterUpdateRepository } from '../repositories/ShelterUpdateRepository.js';
import {
  parseOrThrow,
  createShelterSchema,
  updateShelterSchema,
  registerUpdateSchema,
} from '../schemas/shelterSchemas.js';

function normalizeString(value) {
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  return trimmed === '' ? undefined : trimmed;
}

function normalizePayload(payload) {
  const data = { ...payload };
  for (const key of [
    'name',
    'email',
    'password',
    'address',
    'city',
    'neighborhood',
    'reference_point',
    'contact_name',
    'contact_phone',
    'description',
    'updated_by',
    'note',
  ]) {
    if (key in data) data[key] = normalizeString(data[key]);
  }
  return data;
}

function applyBusinessRules(data) {
  const normalized = { ...data };

  if (normalized.capacity_total != null && normalized.capacity_available != null) {
    if (normalized.capacity_available > normalized.capacity_total) {
      const error = new Error('A capacidade disponível não pode ser maior que a capacidade total.');
      error.statusCode = 400;
      throw error;
    }
  }

  if (normalized.capacity_available === 0 && normalized.status !== 'fechado') {
    normalized.status = 'lotado';
  } else if (normalized.capacity_available > 0 && normalized.status === 'lotado') {
    normalized.status = 'aberto';
  }

  return normalized;
}

function mergeShelter(existing, incoming) {
  return {
    name: incoming.name ?? existing.name,
    email: incoming.email ?? existing.email,
    password: incoming.password ?? existing.password,
    address: incoming.address ?? existing.address,
    city: incoming.city ?? existing.city,
    neighborhood: incoming.neighborhood ?? existing.neighborhood,
    reference_point: incoming.reference_point ?? existing.reference_point,
    latitude: incoming.latitude ?? existing.latitude,
    longitude: incoming.longitude ?? existing.longitude,
    capacity_total: incoming.capacity_total ?? existing.capacity_total,
    capacity_available: incoming.capacity_available ?? existing.capacity_available,
    status: incoming.status ?? existing.status,
    contact_name: incoming.contact_name ?? existing.contact_name,
    contact_phone: incoming.contact_phone ?? existing.contact_phone,
    accessibility: incoming.accessibility ?? existing.accessibility,
    accepts_pets: incoming.accepts_pets ?? existing.accepts_pets,
    description: incoming.description ?? existing.description,
  };
}

export class ShelterService {
  static async list(filters) {
    const result = await ShelterRepository.findAll({
      city: normalizeString(filters.city),
      status: normalizeString(filters.status),
      search: normalizeString(filters.search),
      available:
        filters.available === 'true'
          ? true
          : filters.available === 'false'
            ? false
            : undefined,
      accepts_pets:
        filters.accepts_pets === 'true'
          ? true
          : filters.accepts_pets === 'false'
            ? false
            : undefined,
      accessibility:
        filters.accessibility === 'true'
          ? true
          : filters.accessibility === 'false'
            ? false
            : undefined,
      page: filters.page,
      limit: filters.limit,
    });

    return {
      data: result.items.map(item => {
        const { password, ...shelter } = item;
        return shelter;
      }),
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: Math.ceil(result.total / result.limit),
      },
    };
  }

  static async getById(id) {
    const shelterData = await ShelterRepository.findById(id);
    if (!shelterData) {
      const error = new Error('Abrigo não encontrado.');
      error.statusCode = 404;
      throw error;
    }

    const { password, ...shelter } = shelterData;
    const updates = await ShelterUpdateRepository.findByShelterId(id);
    return { shelter, updates };
  }

  static async create(body) {
    const payload = parseOrThrow(createShelterSchema, normalizePayload(body));

    const existing = await ShelterRepository.findByEmail(payload.email);
    if (existing) {
      const error = new Error('E-mail já cadastrado.');
      error.statusCode = 400;
      throw error;
    }

    const data = applyBusinessRules(payload);
    data.password = await bcrypt.hash(data.password, 10);

    const created = await ShelterRepository.create(data);
    await ShelterUpdateRepository.create({
      shelter_id: created.id,
      updated_by: created.contact_name,
      capacity_total: created.capacity_total,
      capacity_available: created.capacity_available,
      status: created.status,
      note: 'Cadastro inicial do abrigo',
    });

    const { password, ...shelterWithoutPassword } = created;
    return shelterWithoutPassword;
  }

  static async update(id, body) {
    const existing = await ShelterRepository.findById(id);
    if (!existing) {
      const error = new Error('Abrigo não encontrado.');
      error.statusCode = 404;
      throw error;
    }

    const payload = parseOrThrow(updateShelterSchema, normalizePayload(body));

    if (payload.email && payload.email !== existing.email) {
      const emailExists = await ShelterRepository.findByEmail(payload.email);
      if (emailExists) {
        const error = new Error('E-mail já cadastrado.');
        error.statusCode = 400;
        throw error;
      }
    }

    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10);
    }

    const merged = mergeShelter(existing, payload);
    const data = applyBusinessRules(merged);

    const updated = await ShelterRepository.update(id, data);
    const { password, ...shelterWithoutPassword } = updated;
    return shelterWithoutPassword;
  }

  static async remove(id) {
    const deleted = await ShelterRepository.delete(id);
    if (!deleted) {
      const error = new Error('Abrigo não encontrado.');
      error.statusCode = 404;
      throw error;
    }
    return deleted;
  }

  static async summary() {
    return ShelterRepository.summary();
  }

  static async listUpdates(id) {
    const shelter = await ShelterRepository.findById(id);
    if (!shelter) {
      const error = new Error('Abrigo não encontrado.');
      error.statusCode = 404;
      throw error;
    }

    return ShelterUpdateRepository.findByShelterId(id);
  }

  static async registerUpdate(id, body) {
    const shelter = await ShelterRepository.findById(id);
    if (!shelter) {
      const error = new Error('Abrigo não encontrado.');
      error.statusCode = 404;
      throw error;
    }

    const normalized = normalizePayload(body);
    const payload = parseOrThrow(registerUpdateSchema, normalized);

    // Mesclar apenas campos de ocupação para validação de regras de negócio
    const updateData = {
      capacity_total: payload.capacity_total ?? shelter.capacity_total,
      capacity_available: payload.capacity_available ?? shelter.capacity_available,
      status: payload.status ?? shelter.status,
    };

    // Validar regras de negócio (disponível <= total, ajuste automático de status)
    const validatedData = applyBusinessRules(updateData);

    // Atualizar o abrigo com os novos dados de ocupação
    const mergedForUpdate = mergeShelter(shelter, validatedData);
    const updatedShelter = await ShelterRepository.update(id, mergedForUpdate);

    // Registrar no histórico
    const history = await ShelterUpdateRepository.create({
      shelter_id: id,
      updated_by: payload.updated_by,
      capacity_total: updatedShelter.capacity_total,
      capacity_available: updatedShelter.capacity_available,
      status: updatedShelter.status,
      note: payload.note,
    });

    return {
      shelter: updatedShelter,
      update: history,
    };
  }
}
