/**
 * @service categoryService
 * @domain iceCreamCatalog
 * @type REST
 *
 * Service for Category operations
 */

import { authenticatedClient } from '@/core/lib/api';
import type { Category } from '../types/models';

export const categoryService = {
  /**
   * List all categories
   */
  async list(): Promise<Category[]> {
    const { data } = await authenticatedClient.get<{ success: boolean; data: Category[] }>(
      '/category'
    );
    return data.data;
  },
};
