/**
 * @summary
 * Type definitions for Ice Cream Catalog.
 *
 * @module services/iceCreamCatalog/iceCreamTypes
 */

import {
  IceCreamAvailabilityStatus,
  IceCreamNutritionalLevel,
  IceCreamPriceFormat,
  IceCreamAllergen,
  IceCreamDietaryRestriction,
} from '@/constants';

/**
 * @interface IceCreamMetadata
 * @description Metadata for ice cream product including ingredients and nutritional info
 */
export interface IceCreamMetadata {
  ingrediente_principal: string;
  ingredientes_secundarios?: string[];
  alergenicos?: IceCreamAllergen[];
  restricoes_alimentares?: IceCreamDietaryRestriction[];
}

/**
 * @interface IceCreamPriceBySize
 * @description Price structure for different sizes
 */
export interface IceCreamPriceBySize {
  pequeno?: number;
  medio?: number;
  grande?: number;
}

/**
 * @interface IceCreamBasicNutrition
 * @description Basic nutritional information per 100g
 */
export interface IceCreamBasicNutrition {
  calorias: number;
  gorduras: number;
  carboidratos: number;
  proteinas: number;
}

/**
 * @interface IceCreamCompleteNutrition
 * @description Complete nutritional information per 100g
 */
export interface IceCreamCompleteNutrition extends IceCreamBasicNutrition {
  fibras?: number;
  sodio?: number;
  acucares?: number;
  vitaminas?: { [key: string]: number };
  minerais?: { [key: string]: number };
}

/**
 * @interface IceCreamEntity
 * @description Represents an ice cream product entity
 */
export interface IceCreamEntity {
  produto_id: string;
  nome_sorvete: string;
  descricao: string;
  categoria_id: number;
  imagem_url: string;
  disponibilidade_status: IceCreamAvailabilityStatus;
  disponibilidade_observacao: string | null;
  destaque: boolean;
  preco_por_peso: number | null;
  preco_por_tamanho: IceCreamPriceBySize | null;
  preco_por_unidade: number | null;
  exibir_precos: boolean;
  formato_preco_principal: IceCreamPriceFormat | null;
  metadata: IceCreamMetadata;
  nivel_detalhamento_nutricional: IceCreamNutritionalLevel;
  informacoes_nutricionais_basicas: IceCreamBasicNutrition | null;
  informacoes_nutricionais_completas: IceCreamCompleteNutrition | null;
  dateCreated: string;
  dateModified: string;
}

/**
 * @interface IceCreamCreateRequest
 * @description Request payload for creating an ice cream product
 */
export interface IceCreamCreateRequest {
  nome_sorvete: string;
  descricao: string;
  categoria_id: number;
  imagem_url: string;
  disponibilidade_status?: IceCreamAvailabilityStatus;
  disponibilidade_observacao?: string | null;
  destaque?: boolean;
  preco_por_peso?: number | null;
  preco_por_tamanho?: IceCreamPriceBySize | null;
  preco_por_unidade?: number | null;
  exibir_precos?: boolean;
  formato_preco_principal?: IceCreamPriceFormat | null;
  metadata: IceCreamMetadata;
  nivel_detalhamento_nutricional?: IceCreamNutritionalLevel;
  informacoes_nutricionais_basicas?: IceCreamBasicNutrition | null;
  informacoes_nutricionais_completas?: IceCreamCompleteNutrition | null;
}

/**
 * @interface IceCreamUpdateRequest
 * @description Request payload for updating an ice cream product
 */
export interface IceCreamUpdateRequest {
  nome_sorvete: string;
  descricao: string;
  categoria_id: number;
  imagem_url: string;
  disponibilidade_status: IceCreamAvailabilityStatus;
  disponibilidade_observacao: string | null;
  destaque: boolean;
  preco_por_peso: number | null;
  preco_por_tamanho: IceCreamPriceBySize | null;
  preco_por_unidade: number | null;
  exibir_precos: boolean;
  formato_preco_principal: IceCreamPriceFormat | null;
  metadata: IceCreamMetadata;
  nivel_detalhamento_nutricional: IceCreamNutritionalLevel;
  informacoes_nutricionais_basicas: IceCreamBasicNutrition | null;
  informacoes_nutricionais_completas: IceCreamCompleteNutrition | null;
}

/**
 * @interface IceCreamListResponse
 * @description Response structure for listing ice cream products
 */
export interface IceCreamListResponse {
  produto_id: string;
  nome_sorvete: string;
  descricao: string;
  categoria_id: number;
  imagem_url: string;
  disponibilidade_status: IceCreamAvailabilityStatus;
  disponibilidade_observacao: string | null;
  destaque: boolean;
  preco_por_peso: number | null;
  preco_por_tamanho: IceCreamPriceBySize | null;
  preco_por_unidade: number | null;
  exibir_precos: boolean;
  formato_preco_principal: IceCreamPriceFormat | null;
}

/**
 * @interface CategoryEntity
 * @description Represents an ice cream category
 */
export interface CategoryEntity {
  categoria_id: number;
  nome_categoria: string;
  descricao_categoria: string | null;
  ordem_exibicao: number;
  ativa: boolean;
  dateCreated: string;
  dateModified: string;
}

/**
 * @interface CategoryCreateRequest
 * @description Request payload for creating a category
 */
export interface CategoryCreateRequest {
  nome_categoria: string;
  descricao_categoria?: string | null;
  ordem_exibicao?: number;
  ativa?: boolean;
}

/**
 * @interface CategoryUpdateRequest
 * @description Request payload for updating a category
 */
export interface CategoryUpdateRequest {
  nome_categoria: string;
  descricao_categoria: string | null;
  ordem_exibicao: number;
  ativa: boolean;
}

/**
 * @interface CategoryListResponse
 * @description Response structure for listing categories
 */
export interface CategoryListResponse {
  categoria_id: number;
  nome_categoria: string;
  descricao_categoria: string | null;
  ordem_exibicao: number;
  ativa: boolean;
}
