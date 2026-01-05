/**
 * @hook useCategoryList
 * @domain iceCreamCatalog
 *
 * Hook for managing category list
 */

import { useQuery } from '@tanstack/react-query';
import { categoryService } from '../../services/categoryService';

export const useCategoryList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.list(),
  });

  const activeCategories = data?.filter((cat) => cat.ativa) ?? [];
  const sortedCategories = activeCategories.sort((a, b) => a.ordem_exibicao - b.ordem_exibicao);

  return {
    categories: sortedCategories,
    isLoading,
    error,
  };
};
