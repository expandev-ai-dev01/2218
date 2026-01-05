import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/core/lib/utils';
import { Badge } from '@/core/components/badge';
import type { IceCreamCardProps } from './types';

const iceCreamCardVariants = cva(
  'group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-200 hover:shadow-md',
  {
    variants: {
      availability: {
        disponivel: 'border-border',
        indisponivel: 'opacity-60 border-border',
        limitado: 'border-yellow-200 dark:border-yellow-900',
      },
    },
    defaultVariants: {
      availability: 'disponivel',
    },
  }
);

function IceCreamCard({
  iceCream,
  onClick,
  className,
}: IceCreamCardProps & VariantProps<typeof iceCreamCardVariants>) {
  const formatPrice = () => {
    if (!iceCream.exibir_precos) return null;

    const hasAnyPrice =
      iceCream.preco_por_peso || iceCream.preco_por_tamanho || iceCream.preco_por_unidade;

    if (!hasAnyPrice) {
      return <p className="text-muted-foreground text-sm">Consulte preços na loja</p>;
    }

    const mainFormat = iceCream.formato_preco_principal;

    if (mainFormat === 'peso' && iceCream.preco_por_peso) {
      return (
        <div className="flex flex-col gap-1">
          <p className="text-lg font-bold">
            R$ {iceCream.preco_por_peso.toFixed(2)}
            <span className="text-muted-foreground text-sm font-normal">/100g</span>
          </p>
        </div>
      );
    }

    if (mainFormat === 'tamanho' && iceCream.preco_por_tamanho) {
      return (
        <div className="flex flex-col gap-1">
          <p className="text-lg font-bold">
            R$ {iceCream.preco_por_tamanho.pequeno.toFixed(2)}
            <span className="text-muted-foreground text-sm font-normal"> - </span>
            R$ {iceCream.preco_por_tamanho.grande.toFixed(2)}
          </p>
        </div>
      );
    }

    if (mainFormat === 'unidade' && iceCream.preco_por_unidade) {
      return (
        <div className="flex flex-col gap-1">
          <p className="text-lg font-bold">R$ {iceCream.preco_por_unidade.toFixed(2)}</p>
        </div>
      );
    }

    if (iceCream.preco_por_peso) {
      return (
        <p className="text-lg font-bold">
          R$ {iceCream.preco_por_peso.toFixed(2)}
          <span className="text-muted-foreground text-sm font-normal">/100g</span>
        </p>
      );
    }

    return null;
  };

  return (
    <article
      className={cn(
        iceCreamCardVariants({ availability: iceCream.disponibilidade_status }),
        'cursor-pointer',
        className
      )}
      onClick={() => onClick?.(iceCream)}
    >
      <div className="bg-muted relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={iceCream.imagem_url}
          alt={iceCream.nome_sorvete}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-ice-cream.jpg';
          }}
        />
        {iceCream.destaque && (
          <Badge variant="default" className="absolute right-2 top-2">
            Destaque
          </Badge>
        )}
        {iceCream.disponibilidade_status === 'limitado' && (
          <Badge variant="secondary" className="absolute left-2 top-2">
            Limitado
          </Badge>
        )}
        {iceCream.disponibilidade_status === 'indisponivel' && (
          <Badge variant="destructive" className="absolute left-2 top-2">
            Indisponível
          </Badge>
        )}
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
          <h3 className="line-clamp-1 text-lg font-semibold">{iceCream.nome_sorvete}</h3>
          <p className="text-muted-foreground line-clamp-2 text-sm">{iceCream.descricao}</p>
        </div>

        {iceCream.metadata?.restricoes_alimentares &&
          iceCream.metadata.restricoes_alimentares.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {iceCream.metadata.restricoes_alimentares.map((restricao) => (
                <Badge key={restricao} variant="outline" className="text-xs">
                  {restricao}
                </Badge>
              ))}
            </div>
          )}

        <div className="flex items-center justify-between">
          {formatPrice()}
          {iceCream.disponibilidade_observacao && (
            <p className="text-muted-foreground text-xs">{iceCream.disponibilidade_observacao}</p>
          )}
        </div>
      </div>
    </article>
  );
}

export { IceCreamCard };
