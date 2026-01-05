/**
 * @summary
 * API controller for Ice Cream categories.
 * Thin layer that delegates all logic to service.
 *
 * @module api/internal/category/controller
 */

import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse, isServiceError } from '@/utils';
import {
  categoryList,
  categoryCreate,
  categoryGet,
  categoryUpdate,
  categoryDelete,
} from '@/services/iceCreamCatalog';

/**
 * @api {get} /api/internal/category List Categories
 * @apiName ListCategories
 * @apiGroup Category
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Object[]} data List of categories
 * @apiSuccess {Number} data.categoria_id Unique identifier
 * @apiSuccess {String} data.nome_categoria Category name
 * @apiSuccess {String|null} data.descricao_categoria Category description
 * @apiSuccess {Number} data.ordem_exibicao Display order
 * @apiSuccess {Boolean} data.ativa Active status
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await categoryList();
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {post} /api/internal/category Create Category
 * @apiName CreateCategory
 * @apiGroup Category
 *
 * @apiBody {String} nome_categoria Category name (1-30 chars)
 * @apiBody {String} [descricao_categoria] Category description (max 100 chars)
 * @apiBody {Number} [ordem_exibicao] Display order
 * @apiBody {Boolean} [ativa] Active status
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Number} data.categoria_id Unique identifier
 * @apiSuccess {String} data.nome_categoria Category name
 * @apiSuccess {String|null} data.descricao_categoria Category description
 * @apiSuccess {Number} data.ordem_exibicao Display order
 * @apiSuccess {Boolean} data.ativa Active status
 * @apiSuccess {String} data.dateCreated ISO 8601 timestamp
 * @apiSuccess {String} data.dateModified ISO 8601 timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function createHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await categoryCreate(req.body);
    res.status(201).json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {get} /api/internal/category/:categoria_id Get Category
 * @apiName GetCategory
 * @apiGroup Category
 *
 * @apiParam {Number} categoria_id Category ID
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Number} data.categoria_id Unique identifier
 * @apiSuccess {String} data.nome_categoria Category name
 * @apiSuccess {String|null} data.descricao_categoria Category description
 * @apiSuccess {Number} data.ordem_exibicao Display order
 * @apiSuccess {Boolean} data.ativa Active status
 * @apiSuccess {String} data.dateCreated ISO 8601 timestamp
 * @apiSuccess {String} data.dateModified ISO 8601 timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await categoryGet(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {put} /api/internal/category/:categoria_id Update Category
 * @apiName UpdateCategory
 * @apiGroup Category
 *
 * @apiParam {Number} categoria_id Category ID
 *
 * @apiBody {String} nome_categoria Category name (1-30 chars)
 * @apiBody {String|null} descricao_categoria Category description (max 100 chars)
 * @apiBody {Number} ordem_exibicao Display order
 * @apiBody {Boolean} ativa Active status
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Object} data Updated category
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function updateHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await categoryUpdate(req.params, req.body);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {delete} /api/internal/category/:categoria_id Delete Category
 * @apiName DeleteCategory
 * @apiGroup Category
 *
 * @apiParam {Number} categoria_id Category ID
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.message Confirmation message
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function deleteHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await categoryDelete(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}
