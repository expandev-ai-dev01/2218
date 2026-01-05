/**
 * @summary
 * API controller for Ice Cream products.
 * Thin layer that delegates all logic to service.
 *
 * @module api/internal/ice-cream/controller
 */

import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse, isServiceError } from '@/utils';
import {
  iceCreamList,
  iceCreamCreate,
  iceCreamGet,
  iceCreamUpdate,
  iceCreamDelete,
} from '@/services/iceCreamCatalog';

/**
 * @api {get} /api/internal/ice-cream List Ice Cream Products
 * @apiName ListIceCreams
 * @apiGroup IceCream
 *
 * @apiQuery {Number} [categoria_id] Optional category filter
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Object[]} data List of ice cream products
 * @apiSuccess {String} data.produto_id Unique identifier (UUID)
 * @apiSuccess {String} data.nome_sorvete Product name
 * @apiSuccess {String} data.descricao Product description
 * @apiSuccess {Number} data.categoria_id Category ID
 * @apiSuccess {String} data.imagem_url Image URL
 * @apiSuccess {String} data.disponibilidade_status Availability status (disponivel | indisponivel | limitado)
 * @apiSuccess {String|null} data.disponibilidade_observacao Availability note
 * @apiSuccess {Boolean} data.destaque Featured flag
 * @apiSuccess {Number|null} data.preco_por_peso Price per 100g
 * @apiSuccess {Object|null} data.preco_por_tamanho Prices by size
 * @apiSuccess {Number} data.preco_por_tamanho.pequeno Small size price
 * @apiSuccess {Number} data.preco_por_tamanho.medio Medium size price
 * @apiSuccess {Number} data.preco_por_tamanho.grande Large size price
 * @apiSuccess {Number|null} data.preco_por_unidade Unit price
 * @apiSuccess {Boolean} data.exibir_precos Display prices flag
 * @apiSuccess {String|null} data.formato_preco_principal Main price format (peso | tamanho | unidade)
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await iceCreamList(req.query);
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
 * @api {post} /api/internal/ice-cream Create Ice Cream Product
 * @apiName CreateIceCream
 * @apiGroup IceCream
 *
 * @apiBody {String} nome_sorvete Product name (1-50 chars)
 * @apiBody {String} descricao Product description (max 200 chars)
 * @apiBody {Number} categoria_id Category ID
 * @apiBody {String} imagem_url Image URL
 * @apiBody {String} [disponibilidade_status] Availability status (disponivel | indisponivel | limitado)
 * @apiBody {String} [disponibilidade_observacao] Availability note (max 100 chars)
 * @apiBody {Boolean} [destaque] Featured flag
 * @apiBody {Number} [preco_por_peso] Price per 100g
 * @apiBody {Object} [preco_por_tamanho] Prices by size
 * @apiBody {Number} preco_por_tamanho.pequeno Small size price
 * @apiBody {Number} preco_por_tamanho.medio Medium size price
 * @apiBody {Number} preco_por_tamanho.grande Large size price
 * @apiBody {Number} [preco_por_unidade] Unit price
 * @apiBody {Boolean} [exibir_precos] Display prices flag
 * @apiBody {String} [formato_preco_principal] Main price format (peso | tamanho | unidade)
 * @apiBody {Object} metadata Product metadata
 * @apiBody {String} metadata.ingrediente_principal Main ingredient
 * @apiBody {String[]} [metadata.ingredientes_secundarios] Secondary ingredients
 * @apiBody {String[]} [metadata.alergenicos] Allergens
 * @apiBody {String[]} [metadata.restricoes_alimentares] Dietary restrictions
 * @apiBody {String} [nivel_detalhamento_nutricional] Nutritional detail level (nenhum | basico | completo)
 * @apiBody {Object} [informacoes_nutricionais_basicas] Basic nutrition info
 * @apiBody {Number} informacoes_nutricionais_basicas.calorias Calories
 * @apiBody {Number} informacoes_nutricionais_basicas.gorduras Fats
 * @apiBody {Number} informacoes_nutricionais_basicas.carboidratos Carbohydrates
 * @apiBody {Number} informacoes_nutricionais_basicas.proteinas Proteins
 * @apiBody {Object} [informacoes_nutricionais_completas] Complete nutrition info
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Object} data Created product
 * @apiSuccess {String} data.produto_id Unique identifier (UUID)
 * @apiSuccess {String} data.nome_sorvete Product name
 * @apiSuccess {String} data.dateCreated ISO 8601 timestamp
 * @apiSuccess {String} data.dateModified ISO 8601 timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR | NOT_FOUND)
 * @apiError {String} error.message Error message
 */
export async function createHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await iceCreamCreate(req.body);
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
 * @api {get} /api/internal/ice-cream/:produto_id Get Ice Cream Product
 * @apiName GetIceCream
 * @apiGroup IceCream
 *
 * @apiParam {String} produto_id Product UUID
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Object} data Product details
 * @apiSuccess {String} data.produto_id Unique identifier (UUID)
 * @apiSuccess {String} data.nome_sorvete Product name
 * @apiSuccess {String} data.descricao Product description
 * @apiSuccess {Number} data.categoria_id Category ID
 * @apiSuccess {String} data.imagem_url Image URL
 * @apiSuccess {String} data.disponibilidade_status Availability status
 * @apiSuccess {String|null} data.disponibilidade_observacao Availability note
 * @apiSuccess {Boolean} data.destaque Featured flag
 * @apiSuccess {Number|null} data.preco_por_peso Price per 100g
 * @apiSuccess {Object|null} data.preco_por_tamanho Prices by size
 * @apiSuccess {Number|null} data.preco_por_unidade Unit price
 * @apiSuccess {Boolean} data.exibir_precos Display prices flag
 * @apiSuccess {String|null} data.formato_preco_principal Main price format
 * @apiSuccess {Object} data.metadata Product metadata
 * @apiSuccess {String} data.metadata.ingrediente_principal Main ingredient
 * @apiSuccess {String[]} data.metadata.ingredientes_secundarios Secondary ingredients
 * @apiSuccess {String[]} data.metadata.alergenicos Allergens
 * @apiSuccess {String[]} data.metadata.restricoes_alimentares Dietary restrictions
 * @apiSuccess {String} data.nivel_detalhamento_nutricional Nutritional detail level
 * @apiSuccess {Object|null} data.informacoes_nutricionais_basicas Basic nutrition info
 * @apiSuccess {Object|null} data.informacoes_nutricionais_completas Complete nutrition info
 * @apiSuccess {String} data.dateCreated ISO 8601 timestamp
 * @apiSuccess {String} data.dateModified ISO 8601 timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await iceCreamGet(req.params);
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
 * @api {put} /api/internal/ice-cream/:produto_id Update Ice Cream Product
 * @apiName UpdateIceCream
 * @apiGroup IceCream
 *
 * @apiParam {String} produto_id Product UUID
 *
 * @apiBody {String} nome_sorvete Product name (1-50 chars)
 * @apiBody {String} descricao Product description (max 200 chars)
 * @apiBody {Number} categoria_id Category ID
 * @apiBody {String} imagem_url Image URL
 * @apiBody {String} disponibilidade_status Availability status
 * @apiBody {String|null} disponibilidade_observacao Availability note
 * @apiBody {Boolean} destaque Featured flag
 * @apiBody {Number|null} preco_por_peso Price per 100g
 * @apiBody {Object|null} preco_por_tamanho Prices by size
 * @apiBody {Number|null} preco_por_unidade Unit price
 * @apiBody {Boolean} exibir_precos Display prices flag
 * @apiBody {String|null} formato_preco_principal Main price format
 * @apiBody {Object} metadata Product metadata
 * @apiBody {String} nivel_detalhamento_nutricional Nutritional detail level
 * @apiBody {Object|null} informacoes_nutricionais_basicas Basic nutrition info
 * @apiBody {Object|null} informacoes_nutricionais_completas Complete nutrition info
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Object} data Updated product
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
    const data = await iceCreamUpdate(req.params, req.body);
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
 * @api {delete} /api/internal/ice-cream/:produto_id Delete Ice Cream Product
 * @apiName DeleteIceCream
 * @apiGroup IceCream
 *
 * @apiParam {String} produto_id Product UUID
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
    const data = await iceCreamDelete(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}
