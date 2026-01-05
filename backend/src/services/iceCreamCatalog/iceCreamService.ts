/**
 * @summary
 * Business logic for Ice Cream Catalog.
 * Handles CRUD operations for products and categories using in-memory storage.
 * All validation and business logic is centralized here.
 *
 * @module services/iceCreamCatalog/iceCreamService
 */

import { ICE_CREAM_DEFAULTS } from '@/constants';
import { iceCreamStore } from '@/instances';
import { ServiceError } from '@/utils';
import {
  IceCreamEntity,
  IceCreamListResponse,
  CategoryEntity,
  CategoryListResponse,
} from './iceCreamTypes';
import {
  iceCreamCreateSchema,
  iceCreamUpdateSchema,
  productParamsSchema,
  categoryCreateSchema,
  categoryUpdateSchema,
  categoryParamsSchema,
  categoryFilterSchema,
} from './iceCreamValidation';

/**
 * @summary
 * Lists all ice cream products, optionally filtered by category.
 *
 * @function iceCreamList
 * @module services/iceCreamCatalog
 *
 * @param {unknown} query - Query parameters for filtering
 * @returns {Promise<IceCreamListResponse[]>} List of ice cream products
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When query parameters are invalid
 *
 * @example
 * const products = await iceCreamList({ categoria_id: 1 });
 */
export async function iceCreamList(query: unknown): Promise<IceCreamListResponse[]> {
  const validation = categoryFilterSchema.safeParse(query);

  if (!validation.success) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      'Invalid query parameters',
      400,
      validation.error.errors
    );
  }

  const { categoria_id } = validation.data;

  let products: IceCreamEntity[];

  if (categoria_id) {
    products = iceCreamStore.getProductsByCategory(categoria_id);
  } else {
    products = iceCreamStore.getAllProducts();
  }

  /**
   * @rule {BR-002} Products in destaque appear at the top
   * @rule {BR-001} Unavailable products have visual differentiation (handled by frontend)
   */
  const sortedProducts = products.sort((a, b) => {
    if (a.destaque && !b.destaque) return -1;
    if (!a.destaque && b.destaque) return 1;
    return a.nome_sorvete.localeCompare(b.nome_sorvete);
  });

  return sortedProducts.map((p) => ({
    produto_id: p.produto_id,
    nome_sorvete: p.nome_sorvete,
    descricao: p.descricao,
    categoria_id: p.categoria_id,
    imagem_url: p.imagem_url,
    disponibilidade_status: p.disponibilidade_status,
    disponibilidade_observacao: p.disponibilidade_observacao,
    destaque: p.destaque,
    preco_por_peso: p.preco_por_peso,
    preco_por_tamanho: p.preco_por_tamanho,
    preco_por_unidade: p.preco_por_unidade,
    exibir_precos: p.exibir_precos,
    formato_preco_principal: p.formato_preco_principal,
  }));
}

/**
 * @summary
 * Creates a new ice cream product with validated data.
 *
 * @function iceCreamCreate
 * @module services/iceCreamCatalog
 *
 * @param {unknown} body - Raw request body to validate
 * @returns {Promise<IceCreamEntity>} The newly created ice cream product
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When body fails schema validation
 * @throws {ServiceError} NOT_FOUND (404) - When category does not exist
 *
 * @example
 * const newProduct = await iceCreamCreate({ nome_sorvete: 'Chocolate', ... });
 */
export async function iceCreamCreate(body: unknown): Promise<IceCreamEntity> {
  const validation = iceCreamCreateSchema.safeParse(body);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Validation failed', 400, validation.error.errors);
  }

  const params = validation.data;

  /**
   * @rule {RU-007} Category must exist
   */
  if (!iceCreamStore.categoryExists(params.categoria_id)) {
    throw new ServiceError('NOT_FOUND', 'Category not found', 404);
  }

  const now = new Date().toISOString();
  const produto_id = iceCreamStore.getNextProductId();

  const newProduct: IceCreamEntity = {
    produto_id,
    nome_sorvete: params.nome_sorvete,
    descricao: params.descricao,
    categoria_id: params.categoria_id,
    imagem_url: params.imagem_url,
    disponibilidade_status: params.disponibilidade_status ?? ICE_CREAM_DEFAULTS.AVAILABILITY_STATUS,
    disponibilidade_observacao: params.disponibilidade_observacao ?? null,
    destaque: params.destaque ?? ICE_CREAM_DEFAULTS.FEATURED,
    preco_por_peso: params.preco_por_peso ?? null,
    preco_por_tamanho: params.preco_por_tamanho ?? null,
    preco_por_unidade: params.preco_por_unidade ?? null,
    exibir_precos: params.exibir_precos ?? ICE_CREAM_DEFAULTS.DISPLAY_PRICES,
    formato_preco_principal: params.formato_preco_principal ?? null,
    metadata: params.metadata,
    nivel_detalhamento_nutricional:
      params.nivel_detalhamento_nutricional ?? ICE_CREAM_DEFAULTS.NUTRITIONAL_LEVEL,
    informacoes_nutricionais_basicas: params.informacoes_nutricionais_basicas ?? null,
    informacoes_nutricionais_completas: params.informacoes_nutricionais_completas ?? null,
    dateCreated: now,
    dateModified: now,
  };

  iceCreamStore.addProduct(newProduct);
  return newProduct;
}

/**
 * @summary
 * Retrieves a specific ice cream product by its unique identifier.
 *
 * @function iceCreamGet
 * @module services/iceCreamCatalog
 *
 * @param {unknown} params - Raw request params containing the product ID
 * @returns {Promise<IceCreamEntity>} The found ice cream product
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID parameter is invalid
 * @throws {ServiceError} NOT_FOUND (404) - When product does not exist
 *
 * @example
 * const product = await iceCreamGet({ produto_id: 'uuid-here' });
 */
export async function iceCreamGet(params: unknown): Promise<IceCreamEntity> {
  const validation = productParamsSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid product ID', 400, validation.error.errors);
  }

  const { produto_id } = validation.data;
  const product = iceCreamStore.getProductById(produto_id);

  if (!product) {
    throw new ServiceError('NOT_FOUND', 'Product not found', 404);
  }

  return product;
}

/**
 * @summary
 * Updates an existing ice cream product with new data.
 *
 * @function iceCreamUpdate
 * @module services/iceCreamCatalog
 *
 * @param {unknown} params - Raw request params containing the product ID
 * @param {unknown} body - Raw request body with update data
 * @returns {Promise<IceCreamEntity>} The updated ice cream product
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID or body fails validation
 * @throws {ServiceError} NOT_FOUND (404) - When product or category does not exist
 *
 * @example
 * const updated = await iceCreamUpdate({ produto_id: 'uuid' }, { nome_sorvete: 'New Name' });
 */
export async function iceCreamUpdate(params: unknown, body: unknown): Promise<IceCreamEntity> {
  const paramsValidation = productParamsSchema.safeParse(params);

  if (!paramsValidation.success) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      'Invalid product ID',
      400,
      paramsValidation.error.errors
    );
  }

  const bodyValidation = iceCreamUpdateSchema.safeParse(body);

  if (!bodyValidation.success) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      'Validation failed',
      400,
      bodyValidation.error.errors
    );
  }

  const { produto_id } = paramsValidation.data;
  const existing = iceCreamStore.getProductById(produto_id);

  if (!existing) {
    throw new ServiceError('NOT_FOUND', 'Product not found', 404);
  }

  const updateData = bodyValidation.data;

  /**
   * @rule {RU-007} Category must exist
   */
  if (!iceCreamStore.categoryExists(updateData.categoria_id)) {
    throw new ServiceError('NOT_FOUND', 'Category not found', 404);
  }

  const updated = iceCreamStore.updateProduct(produto_id, {
    ...updateData,
    dateModified: new Date().toISOString(),
  });

  return updated as IceCreamEntity;
}

/**
 * @summary
 * Permanently deletes an ice cream product by its ID.
 *
 * @function iceCreamDelete
 * @module services/iceCreamCatalog
 *
 * @param {unknown} params - Raw request params containing the product ID
 * @returns {Promise<{ message: string }>} Success confirmation message
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID parameter is invalid
 * @throws {ServiceError} NOT_FOUND (404) - When product does not exist
 *
 * @example
 * const result = await iceCreamDelete({ produto_id: 'uuid' });
 */
export async function iceCreamDelete(params: unknown): Promise<{ message: string }> {
  const validation = productParamsSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid product ID', 400, validation.error.errors);
  }

  const { produto_id } = validation.data;

  if (!iceCreamStore.productExists(produto_id)) {
    throw new ServiceError('NOT_FOUND', 'Product not found', 404);
  }

  iceCreamStore.deleteProduct(produto_id);
  return { message: 'Product deleted successfully' };
}

/**
 * @summary
 * Lists all categories, optionally only active ones.
 *
 * @function categoryList
 * @module services/iceCreamCatalog
 *
 * @returns {Promise<CategoryListResponse[]>} List of categories
 *
 * @example
 * const categories = await categoryList();
 */
export async function categoryList(): Promise<CategoryListResponse[]> {
  /**
   * @rule {BR-013} Categories are displayed in ascending order by ordem_exibicao
   */
  const categories = iceCreamStore.getActiveCategories();
  const sortedCategories = categories.sort((a, b) => a.ordem_exibicao - b.ordem_exibicao);

  return sortedCategories.map((c) => ({
    categoria_id: c.categoria_id,
    nome_categoria: c.nome_categoria,
    descricao_categoria: c.descricao_categoria,
    ordem_exibicao: c.ordem_exibicao,
    ativa: c.ativa,
  }));
}

/**
 * @summary
 * Creates a new category with validated data.
 *
 * @function categoryCreate
 * @module services/iceCreamCatalog
 *
 * @param {unknown} body - Raw request body to validate
 * @returns {Promise<CategoryEntity>} The newly created category
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When body fails schema validation
 *
 * @example
 * const newCategory = await categoryCreate({ nome_categoria: 'Novos Sabores' });
 */
export async function categoryCreate(body: unknown): Promise<CategoryEntity> {
  const validation = categoryCreateSchema.safeParse(body);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Validation failed', 400, validation.error.errors);
  }

  const params = validation.data;
  const now = new Date().toISOString();
  const categoria_id = iceCreamStore.getNextCategoryId();

  const newCategory: CategoryEntity = {
    categoria_id,
    nome_categoria: params.nome_categoria,
    descricao_categoria: params.descricao_categoria ?? null,
    ordem_exibicao: params.ordem_exibicao ?? 1,
    ativa: params.ativa ?? true,
    dateCreated: now,
    dateModified: now,
  };

  iceCreamStore.addCategory(newCategory);
  return newCategory;
}

/**
 * @summary
 * Retrieves a specific category by its unique identifier.
 *
 * @function categoryGet
 * @module services/iceCreamCatalog
 *
 * @param {unknown} params - Raw request params containing the category ID
 * @returns {Promise<CategoryEntity>} The found category
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID parameter is invalid
 * @throws {ServiceError} NOT_FOUND (404) - When category does not exist
 *
 * @example
 * const category = await categoryGet({ categoria_id: 1 });
 */
export async function categoryGet(params: unknown): Promise<CategoryEntity> {
  const validation = categoryParamsSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid category ID', 400, validation.error.errors);
  }

  const { categoria_id } = validation.data;
  const category = iceCreamStore.getCategoryById(categoria_id);

  if (!category) {
    throw new ServiceError('NOT_FOUND', 'Category not found', 404);
  }

  return category;
}

/**
 * @summary
 * Updates an existing category with new data.
 *
 * @function categoryUpdate
 * @module services/iceCreamCatalog
 *
 * @param {unknown} params - Raw request params containing the category ID
 * @param {unknown} body - Raw request body with update data
 * @returns {Promise<CategoryEntity>} The updated category
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID or body fails validation
 * @throws {ServiceError} NOT_FOUND (404) - When category does not exist
 *
 * @example
 * const updated = await categoryUpdate({ categoria_id: 1 }, { nome_categoria: 'Updated' });
 */
export async function categoryUpdate(params: unknown, body: unknown): Promise<CategoryEntity> {
  const paramsValidation = categoryParamsSchema.safeParse(params);

  if (!paramsValidation.success) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      'Invalid category ID',
      400,
      paramsValidation.error.errors
    );
  }

  const bodyValidation = categoryUpdateSchema.safeParse(body);

  if (!bodyValidation.success) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      'Validation failed',
      400,
      bodyValidation.error.errors
    );
  }

  const { categoria_id } = paramsValidation.data;
  const existing = iceCreamStore.getCategoryById(categoria_id);

  if (!existing) {
    throw new ServiceError('NOT_FOUND', 'Category not found', 404);
  }

  const updateData = bodyValidation.data;

  const updated = iceCreamStore.updateCategory(categoria_id, {
    ...updateData,
    dateModified: new Date().toISOString(),
  });

  return updated as CategoryEntity;
}

/**
 * @summary
 * Permanently deletes a category by its ID.
 *
 * @function categoryDelete
 * @module services/iceCreamCatalog
 *
 * @param {unknown} params - Raw request params containing the category ID
 * @returns {Promise<{ message: string }>} Success confirmation message
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID parameter is invalid
 * @throws {ServiceError} NOT_FOUND (404) - When category does not exist
 *
 * @example
 * const result = await categoryDelete({ categoria_id: 1 });
 */
export async function categoryDelete(params: unknown): Promise<{ message: string }> {
  const validation = categoryParamsSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid category ID', 400, validation.error.errors);
  }

  const { categoria_id } = validation.data;

  if (!iceCreamStore.categoryExists(categoria_id)) {
    throw new ServiceError('NOT_FOUND', 'Category not found', 404);
  }

  iceCreamStore.deleteCategory(categoria_id);
  return { message: 'Category deleted successfully' };
}
