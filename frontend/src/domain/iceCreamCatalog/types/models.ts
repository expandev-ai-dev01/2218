/**
 * @module domain/iceCreamCatalog/types/models
 * Type definitions for Ice Cream Catalog domain
 */

export interface PriceBySize {
  pequeno: number;
  medio: number;
  grande: number;
}

export interface NutritionalInfoBasic {
  calorias: number;
  gorduras: number;
  carboidratos: number;
  proteinas: number;
}

export interface NutritionalInfoComplete extends NutritionalInfoBasic {
  fibras?: number;
  sodio?: number;
  acucares?: number;
  vitaminas?: Record<string, number>;
  minerais?: Record<string, number>;
}

export interface Metadata {
  ingrediente_principal: string;
  ingredientes_secundarios?: string[];
  alergenicos?: string[];
  restricoes_alimentares?: string[];
}

export interface IceCream {
  produto_id: string;
  nome_sorvete: string;
  descricao: string;
  categoria_id: number;
  imagem_url: string;
  disponibilidade_status: 'disponivel' | 'indisponivel' | 'limitado';
  disponibilidade_observacao?: string | null;
  destaque: boolean;
  preco_por_peso?: number | null;
  preco_por_tamanho?: PriceBySize | null;
  preco_por_unidade?: number | null;
  exibir_precos: boolean;
  formato_preco_principal?: 'peso' | 'tamanho' | 'unidade' | null;
  metadata: Metadata;
  nivel_detalhamento_nutricional: 'nenhum' | 'basico' | 'completo';
  informacoes_nutricionais_basicas?: NutritionalInfoBasic | null;
  informacoes_nutricionais_completas?: NutritionalInfoComplete | null;
  dateCreated?: string;
  dateModified?: string;
}

export interface Category {
  categoria_id: number;
  nome_categoria: string;
  descricao_categoria?: string | null;
  ordem_exibicao: number;
  ativa: boolean;
  dateCreated?: string;
  dateModified?: string;
}

export interface IceCreamFilters {
  categoria_id?: number;
}
