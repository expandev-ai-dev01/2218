/**
 * @summary
 * Default values and constants for Ice Cream Catalog.
 * Provides centralized configuration for product creation, validation limits,
 * and category definitions.
 *
 * @module constants/iceCreamCatalog/iceCreamDefaults
 */

/**
 * @interface IceCreamDefaultsType
 * @description Default configuration values applied when creating new ice cream products.
 *
 * @property {boolean} ACTIVE - Default active status for new products (true)
 * @property {boolean} DISPLAY_PRICES - Default price display setting (true)
 * @property {boolean} FEATURED - Default featured status (false)
 * @property {string} AVAILABILITY_STATUS - Default availability status ('disponivel')
 * @property {string} NUTRITIONAL_LEVEL - Default nutritional detail level ('basico')
 * @property {number} MAX_PRODUCTS - Maximum allowed products in memory (500)
 */
export const ICE_CREAM_DEFAULTS = {
  /** Default active status for new products */
  ACTIVE: true,
  /** Default price display setting */
  DISPLAY_PRICES: true,
  /** Default featured status */
  FEATURED: false,
  /** Default availability status */
  AVAILABILITY_STATUS: 'disponivel' as const,
  /** Default nutritional detail level */
  NUTRITIONAL_LEVEL: 'basico' as const,
  /** Maximum allowed products in memory */
  MAX_PRODUCTS: 500,
} as const;

/** Type representing the ICE_CREAM_DEFAULTS constant */
export type IceCreamDefaultsType = typeof ICE_CREAM_DEFAULTS;

/**
 * @interface IceCreamAvailabilityStatusType
 * @description Available status values for ice cream products.
 *
 * @property {string} AVAILABLE - Product is available ('disponivel')
 * @property {string} UNAVAILABLE - Product is unavailable ('indisponivel')
 * @property {string} LIMITED - Product has limited availability ('limitado')
 */
export const ICE_CREAM_AVAILABILITY_STATUS = {
  AVAILABLE: 'disponivel',
  UNAVAILABLE: 'indisponivel',
  LIMITED: 'limitado',
} as const;

/** Type representing the ICE_CREAM_AVAILABILITY_STATUS constant */
export type IceCreamAvailabilityStatusType = typeof ICE_CREAM_AVAILABILITY_STATUS;

/** Union type of all valid availability status values */
export type IceCreamAvailabilityStatus =
  (typeof ICE_CREAM_AVAILABILITY_STATUS)[keyof typeof ICE_CREAM_AVAILABILITY_STATUS];

/**
 * @interface IceCreamNutritionalLevelType
 * @description Available nutritional detail levels.
 *
 * @property {string} NONE - No nutritional information ('nenhum')
 * @property {string} BASIC - Basic nutritional information ('basico')
 * @property {string} COMPLETE - Complete nutritional information ('completo')
 */
export const ICE_CREAM_NUTRITIONAL_LEVEL = {
  NONE: 'nenhum',
  BASIC: 'basico',
  COMPLETE: 'completo',
} as const;

/** Type representing the ICE_CREAM_NUTRITIONAL_LEVEL constant */
export type IceCreamNutritionalLevelType = typeof ICE_CREAM_NUTRITIONAL_LEVEL;

/** Union type of all valid nutritional level values */
export type IceCreamNutritionalLevel =
  (typeof ICE_CREAM_NUTRITIONAL_LEVEL)[keyof typeof ICE_CREAM_NUTRITIONAL_LEVEL];

/**
 * @interface IceCreamPriceFormatType
 * @description Available price format types.
 *
 * @property {string} WEIGHT - Price by weight ('peso')
 * @property {string} SIZE - Price by size ('tamanho')
 * @property {string} UNIT - Price by unit ('unidade')
 */
export const ICE_CREAM_PRICE_FORMAT = {
  WEIGHT: 'peso',
  SIZE: 'tamanho',
  UNIT: 'unidade',
} as const;

/** Type representing the ICE_CREAM_PRICE_FORMAT constant */
export type IceCreamPriceFormatType = typeof ICE_CREAM_PRICE_FORMAT;

/** Union type of all valid price format values */
export type IceCreamPriceFormat =
  (typeof ICE_CREAM_PRICE_FORMAT)[keyof typeof ICE_CREAM_PRICE_FORMAT];

/**
 * @interface IceCreamLimitsType
 * @description Validation constraints for ice cream product fields.
 *
 * @property {number} NAME_MIN_LENGTH - Minimum characters for name field (1)
 * @property {number} NAME_MAX_LENGTH - Maximum characters for name field (50)
 * @property {number} DESCRIPTION_MAX_LENGTH - Maximum characters for description field (200)
 * @property {number} AVAILABILITY_NOTE_MAX_LENGTH - Maximum characters for availability note (100)
 * @property {number} IMAGE_MAX_SIZE_MB - Maximum image size in MB (2)
 * @property {number} INGREDIENT_MAX_LENGTH - Maximum characters for ingredient name (50)
 * @property {number} MAX_SECONDARY_INGREDIENTS - Maximum number of secondary ingredients (10)
 * @property {number} CATEGORY_NAME_MAX_LENGTH - Maximum characters for category name (30)
 * @property {number} CATEGORY_DESCRIPTION_MAX_LENGTH - Maximum characters for category description (100)
 */
export const ICE_CREAM_LIMITS = {
  NAME_MIN_LENGTH: 1,
  NAME_MAX_LENGTH: 50,
  DESCRIPTION_MAX_LENGTH: 200,
  AVAILABILITY_NOTE_MAX_LENGTH: 100,
  IMAGE_MAX_SIZE_MB: 2,
  INGREDIENT_MAX_LENGTH: 50,
  MAX_SECONDARY_INGREDIENTS: 10,
  CATEGORY_NAME_MAX_LENGTH: 30,
  CATEGORY_DESCRIPTION_MAX_LENGTH: 100,
} as const;

/** Type representing the ICE_CREAM_LIMITS constant */
export type IceCreamLimitsType = typeof ICE_CREAM_LIMITS;

/**
 * @interface IceCreamDefaultCategoriesType
 * @description Default categories for ice cream products.
 */
export const ICE_CREAM_DEFAULT_CATEGORIES = [
  { name: 'Tradicionais', order: 1 },
  { name: 'Especiais', order: 2 },
  { name: 'Diet/Light', order: 3 },
  { name: 'Veganos', order: 4 },
  { name: 'Açaí', order: 5 },
] as const;

/** Type representing the ICE_CREAM_DEFAULT_CATEGORIES constant */
export type IceCreamDefaultCategoriesType = typeof ICE_CREAM_DEFAULT_CATEGORIES;

/**
 * @interface IceCreamAllergensType
 * @description Standard allergen types.
 */
export const ICE_CREAM_ALLERGENS = [
  'leite',
  'ovos',
  'amendoim',
  'nozes',
  'soja',
  'gluten',
] as const;

/** Type representing the ICE_CREAM_ALLERGENS constant */
export type IceCreamAllergensType = typeof ICE_CREAM_ALLERGENS;

/** Union type of all valid allergen values */
export type IceCreamAllergen = (typeof ICE_CREAM_ALLERGENS)[number];

/**
 * @interface IceCreamDietaryRestrictionsType
 * @description Standard dietary restriction types.
 */
export const ICE_CREAM_DIETARY_RESTRICTIONS = [
  'vegano',
  'vegetariano',
  'sem_lactose',
  'sem_gluten',
  'diet',
] as const;

/** Type representing the ICE_CREAM_DIETARY_RESTRICTIONS constant */
export type IceCreamDietaryRestrictionsType = typeof ICE_CREAM_DIETARY_RESTRICTIONS;

/** Union type of all valid dietary restriction values */
export type IceCreamDietaryRestriction = (typeof ICE_CREAM_DIETARY_RESTRICTIONS)[number];
