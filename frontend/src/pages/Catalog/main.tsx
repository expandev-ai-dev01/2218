import { useState } from 'react';
import { useIceCreamList, useCategoryList } from '@/domain/iceCreamCatalog/hooks';
import {
  IceCreamCard,
  CategoryFilter,
  IceCreamDetailModal,
} from '@/domain/iceCreamCatalog/components';
import type { IceCream } from '@/domain/iceCreamCatalog/types';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { Alert, AlertDescription, AlertTitle } from '@/core/components/alert';
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from '@/core/components/empty';
import { Package } from 'lucide-react';

function CatalogPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined);
  const [selectedIceCream, setSelectedIceCream] = useState<IceCream | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { categories, isLoading: categoriesLoading } = useCategoryList();
  const {
    iceCreams,
    isLoading: iceCreamsLoading,
    error,
  } = useIceCreamList({
    filters: selectedCategoryId ? { categoria_id: selectedCategoryId } : undefined,
  });

  const handleIceCreamClick = (iceCream: IceCream) => {
    setSelectedIceCream(iceCream);
    setIsModalOpen(true);
  };

  const sortedIceCreams = iceCreams?.slice().sort((a, b) => {
    if (a.destaque && !b.destaque) return -1;
    if (!a.destaque && b.destaque) return 1;
    return a.nome_sorvete.localeCompare(b.nome_sorvete);
  });

  if (categoriesLoading || iceCreamsLoading) {
    return (
      <div className="flex h-full min-h-[400px] w-full items-center justify-center">
        <LoadingSpinner className="size-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertTitle>Erro ao carregar catálogo</AlertTitle>
          <AlertDescription>
            Não foi possível carregar o catálogo de sorvetes. Tente novamente mais tarde.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex flex-col gap-8 px-4 py-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight">Catálogo de Sorvetes</h1>
          <p className="text-muted-foreground text-lg">
            Explore nossos deliciosos sabores artesanais
          </p>
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
        />
      </div>

      {sortedIceCreams && sortedIceCreams.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedIceCreams.map((iceCream) => (
            <IceCreamCard
              key={iceCream.produto_id}
              iceCream={iceCream}
              onClick={handleIceCreamClick}
            />
          ))}
        </div>
      ) : (
        <Empty className="min-h-[400px]">
          <EmptyHeader>
            <Package className="size-12 text-muted-foreground" />
            <EmptyTitle>Nenhum sorvete encontrado</EmptyTitle>
            <EmptyDescription>
              {selectedCategoryId
                ? 'Não há sorvetes disponíveis nesta categoria no momento.'
                : 'Não há sorvetes disponíveis no momento.'}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      <IceCreamDetailModal
        iceCream={selectedIceCream}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}

export { CatalogPage };
