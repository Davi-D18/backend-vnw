import { query } from '../configs/database.js';

export class ShelterRepository {
  static async findAll(filters = {}) {
    const conditions = [];
    const values = [];

    if (filters.city) {
      values.push(filters.city);
      conditions.push(`LOWER(city) = LOWER($${values.length})`);
    }

    if (filters.status) {
      values.push(filters.status);
      conditions.push(`status = $${values.length}`);
    }

    if (filters.search) {
      values.push(`%${filters.search}%`);
      const idx = values.length;
      conditions.push(
        `(name ILIKE $${idx} OR address ILIKE $${idx} OR neighborhood ILIKE $${idx})`
      );
    }

    if (filters.available === true) {
      conditions.push('capacity_available > 0');
    } else if (filters.available === false) {
      conditions.push('capacity_available = 0');
    }

    if (filters.accepts_pets !== undefined) {
      values.push(filters.accepts_pets);
      conditions.push(`accepts_pets = $${values.length}`);
    }

    if (filters.accessibility !== undefined) {
      values.push(filters.accessibility);
      conditions.push(`accessibility = $${values.length}`);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const page = Math.max(Number(filters.page || 1), 1);
    const limit = Math.min(Math.max(Number(filters.limit || 10), 1), 100);
    const offset = (page - 1) * limit;

    const totalResult = await query(
      `SELECT COUNT(*)::int AS total FROM shelters ${whereClause}`,
      values
    );
    const total = totalResult.rows[0]?.total ?? 0;

    const dataResult = await query(
      `
        SELECT *
        FROM shelters
        ${whereClause}
        ORDER BY updated_at DESC, id DESC
        LIMIT $${values.length + 1}
        OFFSET $${values.length + 2}
      `,
      [...values, limit, offset]
    );

    return {
      items: dataResult.rows,
      total,
      page,
      limit,
    };
  }

  static async findById(id) {
    const result = await query('SELECT * FROM shelters WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async findByEmail(email) {
    const result = await query('SELECT * FROM shelters WHERE email = $1', [email]);
    return result.rows[0] || null;
  }

  static async create(data) {
    const result = await query(
      `
        INSERT INTO shelters (
          name, email, password, address, city, neighborhood, reference_point,
          latitude, longitude,
          capacity_total, capacity_available, status,
          contact_name, contact_phone, accessibility, accepts_pets, description
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
        RETURNING *
      `,
      [
        data.name,
        data.email,
        data.password,
        data.address,
        data.city,
        data.neighborhood,
        data.reference_point || null,
        data.latitude || null,
        data.longitude || null,
        data.capacity_total,
        data.capacity_available,
        data.status,
        data.contact_name,
        data.contact_phone,
        data.accessibility,
        data.accepts_pets,
        data.description || null,
      ]
    );

    return result.rows[0];
  }

  static async update(id, data) {
    const result = await query(
      `
        UPDATE shelters
        SET
          name = $2,
          email = $3,
          password = $4,
          address = $5,
          city = $6,
          neighborhood = $7,
          reference_point = $8,
          latitude = $9,
          longitude = $10,
          capacity_total = $11,
          capacity_available = $12,
          status = $13,
          contact_name = $14,
          contact_phone = $15,
          accessibility = $16,
          accepts_pets = $17,
          description = $18
        WHERE id = $1
        RETURNING *
      `,
      [
        id,
        data.name,
        data.email,
        data.password,
        data.address,
        data.city,
        data.neighborhood,
        data.reference_point || null,
        data.latitude || null,
        data.longitude || null,
        data.capacity_total,
        data.capacity_available,
        data.status,
        data.contact_name,
        data.contact_phone,
        data.accessibility,
        data.accepts_pets,
        data.description || null,
      ]
    );

    return result.rows[0] || null;
  }

  static async delete(id) {
    const result = await query('DELETE FROM shelters WHERE id = $1 RETURNING *', [id]);
    return result.rows[0] || null;
  }

  static async summary() {
    const result = await query(`
      SELECT
        COUNT(*)::int AS total_shelters,
        COUNT(*) FILTER (WHERE status = 'aberto')::int AS open_shelters,
        COUNT(*) FILTER (WHERE status = 'lotado')::int AS full_shelters,
        COUNT(*) FILTER (WHERE status = 'fechado')::int AS closed_shelters,
        COALESCE(SUM(capacity_total), 0)::int AS total_capacity,
        COALESCE(SUM(capacity_available), 0)::int AS total_available,
        (COALESCE(SUM(capacity_total), 0) - COALESCE(SUM(capacity_available), 0))::int AS total_occupied,
        CASE 
          WHEN COALESCE(SUM(capacity_total), 0) > 0 
          THEN ROUND(((COALESCE(SUM(capacity_total), 0) - COALESCE(SUM(capacity_available), 0))::numeric / SUM(capacity_total)::numeric) * 100, 2)
          ELSE 0 
        END AS avg_occupancy_percent
      FROM shelters
    `);

    return result.rows[0];
  }
}
