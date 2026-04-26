import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ShelterRepository } from '../repositories/ShelterRepository.js';
import { ShelterService } from '../services/ShelterService.js';
import { parseOrThrow, loginSchema } from '../schemas/shelterSchemas.js';

export class AuthController {
  static async register(req, res) {
    const shelter = await ShelterService.create(req.body);
    res.status(201).json(shelter);
  }

  static async login(req, res) {
    const payload = parseOrThrow(loginSchema, req.body);
    
    const shelter = await ShelterRepository.findByEmail(payload.email);
    if (!shelter) {
      const error = new Error('E-mail ou senha inválidos.');
      error.statusCode = 401;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(payload.password, shelter.password);
    if (!isPasswordValid) {
      const error = new Error('E-mail ou senha inválidos.');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { id: shelter.id },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '1d' }
    );

    const { password, ...shelterWithoutPassword } = shelter;

    res.json({
      token,
      shelter: shelterWithoutPassword,
    });
  }

  static async me(req, res) {
    const shelterData = await ShelterRepository.findById(req.userId);
    if (!shelterData) {
      const error = new Error('Abrigo não encontrado.');
      error.statusCode = 404;
      throw error;
    }

    const { password, ...shelter } = shelterData;
    res.json(shelter);
  }
}
