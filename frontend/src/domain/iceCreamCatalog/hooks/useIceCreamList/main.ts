/**
 * @hook useIceCreamList
 * @domain iceCreamCatalog
 *
 * Hook for managing ice cream product list with filtering
 */

import { useQuery } from '@tanstack/react-query';
import { iceCreamService } from '../../services/iceCreamService';
import type { IceCreamFilters } from '../../types/models';

export interface UseIceCreamListOptions {
  filters?: IceCreamFilters;
}

export const useIceCreamList = (options: UseIceCreamListOptions = {}) => {
  const queryKey = ['ice-creams', options.filters];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => iceCreamService.list(options.filters),
  });

  return {
    iceCreams: data ?? [],
    isLoading,
    error,
    refetch,
  };
};
