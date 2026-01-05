import { Button } from '@/core/components/button';
import { cn } from '@/core/lib/utils';
import type { CategoryFilterProps } from './types';

function CategoryFilter({ categories, selectedCategoryId, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedCategoryId === undefined ? 'default' : 'outline'}
        size="sm"
        onClick={() => onSelectCategory(undefined)}
        className={cn('transition-all', selectedCategoryId === undefined && 'shadow-md')}
      >
        Todos
      </Button>
      {categories?.map((category) => (
        <Button
          key={category.categoria_id}
          variant={selectedCategoryId === category.categoria_id ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSelectCategory(category.categoria_id)}
          className={cn(
            'transition-all',
            selectedCategoryId === category.categoria_id && 'shadow-md'
          )}
        >
          {category.nome_categoria}
        </Button>
      ))}
    </div>
  );
}

export { CategoryFilter };
