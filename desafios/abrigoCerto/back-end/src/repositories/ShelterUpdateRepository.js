import { query } from '../configs/database.js';

export class ShelterUpdateRepository {
  static async create(data) {
    const result = await query(
      `
        INSERT INTO shelter_updates (
          shelter_id, updated_by, capacity_total, capacity_available, status, note
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `,
      [
        data.shelter_id,
        data.updated_by,
        data.capacity_total ?? null,
        data.capacity_available ?? null,
        data.status ?? null,
        data.note,
      ]
    );

    return result.rows[0];
  }

  static async findByShelterId(shelterId) {
    const result = await query(
      `
        SELECT *
        FROM shelter_updates
        WHERE shelter_id = $1
        ORDER BY created_at DESC, id DESC
      `,
      [shelterId]
    );

    return result.rows;
  }
}
