/**
 * @hook useIceCreamDetail
 * @domain iceCreamCatalog
 *
 * Hook for fetching single ice cream product details
 */

import { useQuery } from '@tanstack/react-query';
import { iceCreamService } from '../../services/iceCreamService';

export interface UseIceCreamDetailOptions {
  produto_id: string;
  enabled?: boolean;
}

export const useIceCreamDetail = ({ produto_id, enabled = true }: UseIceCreamDetailOptions) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['ice-cream', produto_id],
    queryFn: () => iceCreamService.getById(produto_id),
    enabled: enabled && !!produto_id,
  });

  return {
    iceCream: data,
    isLoading,
    error,
  };
};
