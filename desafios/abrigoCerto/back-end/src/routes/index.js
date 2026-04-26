import express from 'express';
import { createShelterRoutes } from './shelterRoutes.js';
import authRoutes from './authRoutes.js';
import { HealthController } from '../controllers/HealthController.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';

export function createApiRoutes() {
  const router = express.Router();

  router.get('/health', asyncHandler(HealthController.check));
  router.use('/auth', authRoutes);
  router.use('/shelters', createShelterRoutes());

  return router;
}
