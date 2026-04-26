import express from 'express';
import { ShelterController } from '../controllers/ShelterController.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { authMiddleware, authorizeShelter } from '../middlewares/auth.js';

export function createShelterRoutes() {
  const router = express.Router();

  router.get('/summary', asyncHandler(ShelterController.summary));
  router.get('/:id/updates', asyncHandler(ShelterController.listUpdates));
  router.post('/:id/updates', authMiddleware, authorizeShelter, asyncHandler(ShelterController.registerUpdate));
  router.get('/', asyncHandler(ShelterController.list));
  router.post('/', asyncHandler(ShelterController.create)); // Pode ser mantido público ou não, mas já temos o /auth/register
  router.get('/:id', asyncHandler(ShelterController.getById));
  router.put('/:id', authMiddleware, authorizeShelter, asyncHandler(ShelterController.update));
  router.delete('/:id', authMiddleware, authorizeShelter, asyncHandler(ShelterController.remove));

  return router;
}
