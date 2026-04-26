import { z } from 'zod';

export const statusSchema = z.enum(['aberto', 'lotado', 'fechado']);

const baseShelterSchema = {
  name: z.string().trim().min(1, 'O nome do abrigo é obrigatório.'),
  email: z.string().trim().email('E-mail inválido.').min(1, 'O e-mail é obrigatório.'),
  password: z.string().trim().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
  address: z.string().trim().min(1, 'O endereço é obrigatório.'),
  city: z.string().trim().min(1, 'A cidade é obrigatória.'),
  neighborhood: z.string().trim().min(1, 'O bairro é obrigatório.'),
  reference_point: z.string().trim().optional().nullable(),
  latitude: z.coerce.number().optional().nullable(),
  longitude: z.coerce.number().optional().nullable(),
  capacity_total: z.coerce.number().int().min(0, 'A capacidade total deve ser maior ou igual a zero.'),
  capacity_available: z.coerce.number().int().min(0, 'A capacidade disponível deve ser maior ou igual a zero.'),
  status: statusSchema.default('aberto'),
  contact_name: z.string().trim().min(1, 'O nome do contato é obrigatório.'),
  contact_phone: z.string().trim().min(1, 'O telefone de contato é obrigatório.'),
  accessibility: z.coerce.boolean().default(false),
  accepts_pets: z.coerce.boolean().default(false),
  description: z.string().trim().optional().nullable(),
};

export const createShelterSchema = z.object(baseShelterSchema).superRefine((data, ctx) => {
  if (data.capacity_available > data.capacity_total) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['capacity_available'],
      message: 'A capacidade disponível não pode ser maior que a capacidade total.',
    });
  }
});

export const loginSchema = z.object({
  email: z.string().trim().email('E-mail inválido.').min(1, 'O e-mail é obrigatório.'),
  password: z.string().trim().min(1, 'A senha é obrigatória.'),
});

export const updateShelterSchema = z
  .object({
    name: baseShelterSchema.name.optional(),
    email: baseShelterSchema.email.optional(),
    password: baseShelterSchema.password.optional(),
    address: baseShelterSchema.address.optional(),
    city: baseShelterSchema.city.optional(),
    neighborhood: baseShelterSchema.neighborhood.optional(),
    reference_point: baseShelterSchema.reference_point.optional(),
    latitude: baseShelterSchema.latitude.optional(),
    longitude: baseShelterSchema.longitude.optional(),
    capacity_total: baseShelterSchema.capacity_total.optional(),
    capacity_available: baseShelterSchema.capacity_available.optional(),
    status: statusSchema.optional(),
    contact_name: baseShelterSchema.contact_name.optional(),
    contact_phone: baseShelterSchema.contact_phone.optional(),
    accessibility: baseShelterSchema.accessibility.optional(),
    accepts_pets: baseShelterSchema.accepts_pets.optional(),
    description: baseShelterSchema.description.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Envie ao menos um campo para atualização.',
  });

export const registerUpdateSchema = z
  .object({
    updated_by: z.string().trim().min(1, 'O campo updated_by é obrigatório.'),
    capacity_total: z.coerce.number().int().min(0).optional(),
    capacity_available: z.coerce.number().int().min(0).optional(),
    status: statusSchema.optional(),
    note: z.string().trim().min(1, 'A observação é obrigatória.'),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Envie os dados da atualização.',
  });

export function parseOrThrow(schema, data) {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      field: issue.path.join('.') || 'body',
      message: issue.message,
    }));
    const error = new Error('Dados inválidos.');
    error.statusCode = 400;
    error.details = errors;
    throw error;
  }
  return result.data;
}
