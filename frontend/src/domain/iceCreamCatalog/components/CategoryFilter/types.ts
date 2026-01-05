import type { Category } from '../../types/models';

export interface CategoryFilterProps {
  categories: Category[];
  selectedCategoryId?: number;
  onSelectCategory: (categoryId: number | undefined) => void;
}
