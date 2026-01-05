/**
 * @summary
 * In-memory store instance for Ice Cream Catalog.
 * Provides singleton pattern for data storage without database.
 *
 * @module instances/iceCreamCatalog/iceCreamStore
 */

import { v4 as uuidv4 } from 'uuid';
import { ICE_CREAM_DEFAULTS, ICE_CREAM_DEFAULT_CATEGORIES } from '@/constants';
import { IceCreamEntity, CategoryEntity } from '@/services/iceCreamCatalog/iceCreamTypes';

/**
 * In-memory store for ice cream products
 */
class IceCreamStore {
  private products: Map<string, IceCreamEntity> = new Map();
  private categories: Map<number, CategoryEntity> = new Map();
  private currentCategoryId: number = 0;

  constructor() {
    this.initializeDefaultCategories();
  }

  /**
   * Initialize default categories
   */
  private initializeDefaultCategories(): void {
    ICE_CREAM_DEFAULT_CATEGORIES.forEach((cat) => {
      const id = this.getNextCategoryId();
      const now = new Date().toISOString();
      this.categories.set(id, {
        categoria_id: id,
        nome_categoria: cat.name,
        descricao_categoria: null,
        ordem_exibicao: cat.order,
        ativa: true,
        dateCreated: now,
        dateModified: now,
      });
    });
  }

  /**
   * Get next available product UUID
   */
  getNextProductId(): string {
    return uuidv4();
  }

  /**
   * Get next available category ID
   */
  getNextCategoryId(): number {
    this.currentCategoryId += 1;
    return this.currentCategoryId;
  }

  /**
   * Get all products
   */
  getAllProducts(): IceCreamEntity[] {
    return Array.from(this.products.values());
  }

  /**
   * Get products by category
   */
  getProductsByCategory(categoryId: number): IceCreamEntity[] {
    return Array.from(this.products.values()).filter(
      (product) => product.categoria_id === categoryId
    );
  }

  /**
   * Get product by ID
   */
  getProductById(id: string): IceCreamEntity | undefined {
    return this.products.get(id);
  }

  /**
   * Add new product
   */
  addProduct(product: IceCreamEntity): IceCreamEntity {
    if (this.products.size >= ICE_CREAM_DEFAULTS.MAX_PRODUCTS) {
      throw new Error('Maximum products limit reached');
    }
    this.products.set(product.produto_id, product);
    return product;
  }

  /**
   * Update existing product
   */
  updateProduct(id: string, data: Partial<IceCreamEntity>): IceCreamEntity | undefined {
    const existing = this.products.get(id);
    if (!existing) {
      return undefined;
    }
    const updated = { ...existing, ...data };
    this.products.set(id, updated);
    return updated;
  }

  /**
   * Delete product by ID
   */
  deleteProduct(id: string): boolean {
    return this.products.delete(id);
  }

  /**
   * Check if product exists
   */
  productExists(id: string): boolean {
    return this.products.has(id);
  }

  /**
   * Get all categories
   */
  getAllCategories(): CategoryEntity[] {
    return Array.from(this.categories.values());
  }

  /**
   * Get active categories
   */
  getActiveCategories(): CategoryEntity[] {
    return Array.from(this.categories.values()).filter((cat) => cat.ativa);
  }

  /**
   * Get category by ID
   */
  getCategoryById(id: number): CategoryEntity | undefined {
    return this.categories.get(id);
  }

  /**
   * Add new category
   */
  addCategory(category: CategoryEntity): CategoryEntity {
    this.categories.set(category.categoria_id, category);
    return category;
  }

  /**
   * Update existing category
   */
  updateCategory(id: number, data: Partial<CategoryEntity>): CategoryEntity | undefined {
    const existing = this.categories.get(id);
    if (!existing) {
      return undefined;
    }
    const updated = { ...existing, ...data };
    this.categories.set(id, updated);
    return updated;
  }

  /**
   * Delete category by ID
   */
  deleteCategory(id: number): boolean {
    return this.categories.delete(id);
  }

  /**
   * Check if category exists
   */
  categoryExists(id: number): boolean {
    return this.categories.has(id);
  }

  /**
   * Get total count of products
   */
  countProducts(): number {
    return this.products.size;
  }

  /**
   * Get total count of categories
   */
  countCategories(): number {
    return this.categories.size;
  }

  /**
   * Clear all products (useful for testing)
   */
  clearProducts(): void {
    this.products.clear();
  }

  /**
   * Clear all categories (useful for testing)
   */
  clearCategories(): void {
    this.categories.clear();
    this.currentCategoryId = 0;
  }
}

/**
 * Singleton instance of IceCreamStore
 */
export const iceCreamStore = new IceCreamStore();
