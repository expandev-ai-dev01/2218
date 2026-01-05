/**
 * @service iceCreamService
 * @domain iceCreamCatalog
 * @type REST
 *
 * Service for Ice Cream product operations
 */

import { authenticatedClient } from '@/core/lib/api';
import type { IceCream, IceCreamFilters } from '../types/models';

export const iceCreamService = {
  /**
   * List all ice cream products with optional category filter
   */
  async list(filters?: IceCreamFilters): Promise<IceCream[]> {
    const { data } = await authenticatedClient.get<{ success: boolean; data: IceCream[] }>(
      '/ice-cream',
      { params: filters }
    );
    return data.data;
  },

  /**
   * Get single ice cream product by ID
   */
  async getById(produto_id: string): Promise<IceCream> {
    const { data } = await authenticatedClient.get<{ success: boolean; data: IceCream }>(
      `/ice-cream/${produto_id}`
    );
    return data.data;
  },
};
