import { ShelterService } from '../services/ShelterService.js';

export class ShelterController {
  static async list(req, res) {
    const data = await ShelterService.list(req.query);
    return res.status(200).json(data);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const data = await ShelterService.getById(id);
    return res.status(200).json({ data });
  }

  static async create(req, res) {
    const data = await ShelterService.create(req.body);
    return res.status(201).json({
      message: 'Abrigo cadastrado com sucesso.',
      data,
    });
  }

  static async update(req, res) {
    const { id } = req.params;
    const data = await ShelterService.update(id, req.body);
    return res.status(200).json({
      message: 'Abrigo atualizado com sucesso.',
      data,
    });
  }

  static async remove(req, res) {
    const { id } = req.params;
    const data = await ShelterService.remove(id);
    return res.status(200).json({
      message: 'Abrigo removido com sucesso.',
      data,
    });
  }

  static async summary(req, res) {
    const data = await ShelterService.summary();
    return res.status(200).json({ data });
  }

  static async listUpdates(req, res) {
    const { id } = req.params;
    const data = await ShelterService.listUpdates(id);
    return res.status(200).json({ data });
  }

  static async registerUpdate(req, res) {
    const { id } = req.params;
    const data = await ShelterService.registerUpdate(id, req.body);
    return res.status(201).json({
      message: 'Atualização registrada com sucesso.',
      data,
    });
  }
}
