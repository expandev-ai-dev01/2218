/**
 * @summary
 * Validation schemas for Ice Cream Catalog.
 * Centralizes all Zod validation logic for the service.
 *
 * @module services/iceCreamCatalog/iceCreamValidation
 */

import { z } from 'zod';
import {
  ICE_CREAM_LIMITS,
  ICE_CREAM_AVAILABILITY_STATUS,
  ICE_CREAM_NUTRITIONAL_LEVEL,
  ICE_CREAM_PRICE_FORMAT,
  ICE_CREAM_ALLERGENS,
  ICE_CREAM_DIETARY_RESTRICTIONS,
} from '@/constants';

/**
 * Schema for metadata object validation
 */
export const metadataSchema = z.object({
  ingrediente_principal: z.string().min(1).max(ICE_CREAM_LIMITS.INGREDIENT_MAX_LENGTH),
  ingredientes_secundarios: z
    .array(z.string().max(ICE_CREAM_LIMITS.INGREDIENT_MAX_LENGTH))
    .max(ICE_CREAM_LIMITS.MAX_SECONDARY_INGREDIENTS)
    .optional(),
  alergenicos: z.array(z.enum(ICE_CREAM_ALLERGENS)).optional(),
  restricoes_alimentares: z.array(z.enum(ICE_CREAM_DIETARY_RESTRICTIONS)).optional(),
});

/**
 * Schema for price by size validation
 */
export const priceBySizeSchema = z
  .object({
    pequeno: z.number().positive().optional(),
    medio: z.number().positive().optional(),
    grande: z.number().positive().optional(),
  })
  .nullable();

/**
 * Schema for basic nutrition validation
 */
export const basicNutritionSchema = z
  .object({
    calorias: z.number().nonnegative(),
    gorduras: z.number().nonnegative(),
    carboidratos: z.number().nonnegative(),
    proteinas: z.number().nonnegative(),
  })
  .nullable();

/**
 * Schema for complete nutrition validation
 */
export const completeNutritionSchema = z
  .object({
    calorias: z.number().nonnegative(),
    gorduras: z.number().nonnegative(),
    carboidratos: z.number().nonnegative(),
    proteinas: z.number().nonnegative(),
    fibras: z.number().nonnegative().optional(),
    sodio: z.number().nonnegative().optional(),
    acucares: z.number().nonnegative().optional(),
    vitaminas: z.record(z.number().nonnegative()).optional(),
    minerais: z.record(z.number().nonnegative()).optional(),
  })
  .nullable();

/**
 * Schema for ice cream create request validation
 */
export const iceCreamCreateSchema = z.object({
  nome_sorvete: z
    .string()
    .min(ICE_CREAM_LIMITS.NAME_MIN_LENGTH)
    .max(ICE_CREAM_LIMITS.NAME_MAX_LENGTH),
  descricao: z.string().max(ICE_CREAM_LIMITS.DESCRIPTION_MAX_LENGTH),
  categoria_id: z.number().int().positive(),
  imagem_url: z.string().url(),
  disponibilidade_status: z
    .enum([
      ICE_CREAM_AVAILABILITY_STATUS.AVAILABLE,
      ICE_CREAM_AVAILABILITY_STATUS.UNAVAILABLE,
      ICE_CREAM_AVAILABILITY_STATUS.LIMITED,
    ])
    .optional(),
  disponibilidade_observacao: z
    .string()
    .max(ICE_CREAM_LIMITS.AVAILABILITY_NOTE_MAX_LENGTH)
    .nullable()
    .optional(),
  destaque: z.boolean().optional(),
  preco_por_peso: z.number().positive().nullable().optional(),
  preco_por_tamanho: priceBySizeSchema.optional(),
  preco_por_unidade: z.number().positive().nullable().optional(),
  exibir_precos: z.boolean().optional(),
  formato_preco_principal: z
    .enum([ICE_CREAM_PRICE_FORMAT.WEIGHT, ICE_CREAM_PRICE_FORMAT.SIZE, ICE_CREAM_PRICE_FORMAT.UNIT])
    .nullable()
    .optional(),
  metadata: metadataSchema,
  nivel_detalhamento_nutricional: z
    .enum([
      ICE_CREAM_NUTRITIONAL_LEVEL.NONE,
      ICE_CREAM_NUTRITIONAL_LEVEL.BASIC,
      ICE_CREAM_NUTRITIONAL_LEVEL.COMPLETE,
    ])
    .optional(),
  informacoes_nutricionais_basicas: basicNutritionSchema.optional(),
  informacoes_nutricionais_completas: completeNutritionSchema.optional(),
});

/**
 * Schema for ice cream update request validation
 */
export const iceCreamUpdateSchema = z.object({
  nome_sorvete: z
    .string()
    .min(ICE_CREAM_LIMITS.NAME_MIN_LENGTH)
    .max(ICE_CREAM_LIMITS.NAME_MAX_LENGTH),
  descricao: z.string().max(ICE_CREAM_LIMITS.DESCRIPTION_MAX_LENGTH),
  categoria_id: z.number().int().positive(),
  imagem_url: z.string().url(),
  disponibilidade_status: z.enum([
    ICE_CREAM_AVAILABILITY_STATUS.AVAILABLE,
    ICE_CREAM_AVAILABILITY_STATUS.UNAVAILABLE,
    ICE_CREAM_AVAILABILITY_STATUS.LIMITED,
  ]),
  disponibilidade_observacao: z
    .string()
    .max(ICE_CREAM_LIMITS.AVAILABILITY_NOTE_MAX_LENGTH)
    .nullable(),
  destaque: z.boolean(),
  preco_por_peso: z.number().positive().nullable(),
  preco_por_tamanho: priceBySizeSchema,
  preco_por_unidade: z.number().positive().nullable(),
  exibir_precos: z.boolean(),
  formato_preco_principal: z
    .enum([ICE_CREAM_PRICE_FORMAT.WEIGHT, ICE_CREAM_PRICE_FORMAT.SIZE, ICE_CREAM_PRICE_FORMAT.UNIT])
    .nullable(),
  metadata: metadataSchema,
  nivel_detalhamento_nutricional: z.enum([
    ICE_CREAM_NUTRITIONAL_LEVEL.NONE,
    ICE_CREAM_NUTRITIONAL_LEVEL.BASIC,
    ICE_CREAM_NUTRITIONAL_LEVEL.COMPLETE,
  ]),
  informacoes_nutricionais_basicas: basicNutritionSchema,
  informacoes_nutricionais_completas: completeNutritionSchema,
});

/**
 * Schema for product ID parameter validation
 */
export const productParamsSchema = z.object({
  produto_id: z.string().uuid(),
});

/**
 * Schema for category create request validation
 */
export const categoryCreateSchema = z.object({
  nome_categoria: z.string().min(1).max(ICE_CREAM_LIMITS.CATEGORY_NAME_MAX_LENGTH),
  descricao_categoria: z
    .string()
    .max(ICE_CREAM_LIMITS.CATEGORY_DESCRIPTION_MAX_LENGTH)
    .nullable()
    .optional(),
  ordem_exibicao: z.number().int().positive().optional(),
  ativa: z.boolean().optional(),
});

/**
 * Schema for category update request validation
 */
export const categoryUpdateSchema = z.object({
  nome_categoria: z.string().min(1).max(ICE_CREAM_LIMITS.CATEGORY_NAME_MAX_LENGTH),
  descricao_categoria: z.string().max(ICE_CREAM_LIMITS.CATEGORY_DESCRIPTION_MAX_LENGTH).nullable(),
  ordem_exibicao: z.number().int().positive(),
  ativa: z.boolean(),
});

/**
 * Schema for category ID parameter validation
 */
export const categoryParamsSchema = z.object({
  categoria_id: z.coerce.number().int().positive(),
});

/**
 * Schema for category filter query validation
 */
export const categoryFilterSchema = z.object({
  categoria_id: z.coerce.number().int().positive().optional(),
});

/**
 * Inferred types from schemas
 */
export type IceCreamCreateInput = z.infer<typeof iceCreamCreateSchema>;
export type IceCreamUpdateInput = z.infer<typeof iceCreamUpdateSchema>;
export type ProductParamsInput = z.infer<typeof productParamsSchema>;
export type CategoryCreateInput = z.infer<typeof categoryCreateSchema>;
export type CategoryUpdateInput = z.infer<typeof categoryUpdateSchema>;
export type CategoryParamsInput = z.infer<typeof categoryParamsSchema>;
export type CategoryFilterInput = z.infer<typeof categoryFilterSchema>;
