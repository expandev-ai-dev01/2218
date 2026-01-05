/**
 * @module domain/iceCreamCatalog
 * Ice Cream Catalog Domain Module
 * Exports all components, services, hooks, types, and validations
 */

export * from './components';
export * from './services';
export * from './hooks';

export type {
  IceCream,
  Category,
  IceCreamFilters as IceCreamFiltersType,
  PriceBySize,
  NutritionalInfoBasic,
  NutritionalInfoComplete,
  Metadata,
} from './types';
