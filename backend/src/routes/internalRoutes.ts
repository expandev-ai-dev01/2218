/**
 * @summary
 * Internal API routes configuration.
 * Handles authenticated endpoints for business operations.
 *
 * @module routes/internalRoutes
 */

import { Router } from 'express';
import * as iceCreamController from '@/api/internal/ice-cream/controller';
import * as categoryController from '@/api/internal/category/controller';

const router = Router();

/**
 * @rule {be-route-configuration}
 * Ice Cream routes - /api/internal/ice-cream
 */
router.get('/ice-cream', iceCreamController.listHandler);
router.post('/ice-cream', iceCreamController.createHandler);
router.get('/ice-cream/:produto_id', iceCreamController.getHandler);
router.put('/ice-cream/:produto_id', iceCreamController.updateHandler);
router.delete('/ice-cream/:produto_id', iceCreamController.deleteHandler);

/**
 * @rule {be-route-configuration}
 * Category routes - /api/internal/category
 */
router.get('/category', categoryController.listHandler);
router.post('/category', categoryController.createHandler);
router.get('/category/:categoria_id', categoryController.getHandler);
router.put('/category/:categoria_id', categoryController.updateHandler);
router.delete('/category/:categoria_id', categoryController.deleteHandler);

export default router;
