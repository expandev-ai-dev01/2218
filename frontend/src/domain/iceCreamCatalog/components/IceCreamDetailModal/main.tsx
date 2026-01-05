import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/core/components/dialog';
import { Badge } from '@/core/components/badge';
import { Separator } from '@/core/components/separator';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/core/lib/utils';
import type { IceCreamDetailModalProps } from './types';

function IceCreamDetailModal({ iceCream, open, onOpenChange }: IceCreamDetailModalProps) {
  if (!iceCream) return null;

  const renderPrices = () => {
    if (!iceCream.exibir_precos) return null;

    const hasAnyPrice =
      iceCream.preco_por_peso || iceCream.preco_por_tamanho || iceCream.preco_por_unidade;

    if (!hasAnyPrice) {
      return (
        <div className="bg-muted rounded-lg p-4">
          <p className="text-muted-foreground text-center text-sm">Consulte preços na loja</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-3">
        {iceCream.preco_por_peso && (
          <div className="bg-muted flex items-center justify-between rounded-lg p-3">
            <span className="text-sm font-medium">Por peso (100g)</span>
            <span className="text-lg font-bold">R$ {iceCream.preco_por_peso.toFixed(2)}</span>
          </div>
        )}
        {iceCream.preco_por_tamanho && (
          <div className="bg-muted flex flex-col gap-2 rounded-lg p-3">
            <span className="text-sm font-medium">Por tamanho</span>
            <div className="flex flex-col gap-1 text-sm">
              <div className="flex justify-between">
                <span>Pequeno</span>
                <span className="font-semibold">
                  R$ {iceCream.preco_por_tamanho.pequeno.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Médio</span>
                <span className="font-semibold">
                  R$ {iceCream.preco_por_tamanho.medio.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Grande</span>
                <span className="font-semibold">
                  R$ {iceCream.preco_por_tamanho.grande.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}
        {iceCream.preco_por_unidade && (
          <div className="bg-muted flex items-center justify-between rounded-lg p-3">
            <span className="text-sm font-medium">Por unidade</span>
            <span className="text-lg font-bold">R$ {iceCream.preco_por_unidade.toFixed(2)}</span>
          </div>
        )}
      </div>
    );
  };

  const renderNutritionalInfo = () => {
    if (iceCream.nivel_detalhamento_nutricional === 'nenhum') return null;

    if (
      iceCream.nivel_detalhamento_nutricional === 'basico' &&
      iceCream.informacoes_nutricionais_basicas
    ) {
      const info = iceCream.informacoes_nutricionais_basicas;
      return (
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold">Informações Nutricionais (por 100g)</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-muted flex justify-between rounded-md p-2">
              <span>Calorias</span>
              <span className="font-semibold">{info.calorias} kcal</span>
            </div>
            <div className="bg-muted flex justify-between rounded-md p-2">
              <span>Gorduras</span>
              <span className="font-semibold">{info.gorduras}g</span>
            </div>
            <div className="bg-muted flex justify-between rounded-md p-2">
              <span>Carboidratos</span>
              <span className="font-semibold">{info.carboidratos}g</span>
            </div>
            <div className="bg-muted flex justify-between rounded-md p-2">
              <span>Proteínas</span>
              <span className="font-semibold">{info.proteinas}g</span>
            </div>
          </div>
        </div>
      );
    }

    if (
      iceCream.nivel_detalhamento_nutricional === 'completo' &&
      iceCream.informacoes_nutricionais_completas
    ) {
      const info = iceCream.informacoes_nutricionais_completas;
      return (
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold">Informações Nutricionais Completas (por 100g)</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-muted flex justify-between rounded-md p-2">
              <span>Calorias</span>
              <span className="font-semibold">{info.calorias} kcal</span>
            </div>
            <div className="bg-muted flex justify-between rounded-md p-2">
              <span>Gorduras</span>
              <span className="font-semibold">{info.gorduras}g</span>
            </div>
            <div className="bg-muted flex justify-between rounded-md p-2">
              <span>Carboidratos</span>
              <span className="font-semibold">{info.carboidratos}g</span>
            </div>
            <div className="bg-muted flex justify-between rounded-md p-2">
              <span>Proteínas</span>
              <span className="font-semibold">{info.proteinas}g</span>
            </div>
            {info.fibras !== undefined && (
              <div className="bg-muted flex justify-between rounded-md p-2">
                <span>Fibras</span>
                <span className="font-semibold">{info.fibras}g</span>
              </div>
            )}
            {info.sodio !== undefined && (
              <div className="bg-muted flex justify-between rounded-md p-2">
                <span>Sódio</span>
                <span className="font-semibold">{info.sodio}mg</span>
              </div>
            )}
            {info.acucares !== undefined && (
              <div className="bg-muted flex justify-between rounded-md p-2">
                <span>Açúcares</span>
                <span className="font-semibold">{info.acucares}g</span>
              </div>
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl">{iceCream.nome_sorvete}</DialogTitle>
              <DialogDescription className="mt-2">{iceCream.descricao}</DialogDescription>
            </div>
            {iceCream.destaque && <Badge variant="default">Destaque</Badge>}
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <img
              src={iceCream.imagem_url}
              alt={iceCream.nome_sorvete}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/placeholder-ice-cream.jpg';
              }}
            />
          </div>

          {iceCream.disponibilidade_status !== 'disponivel' && (
            <div
              className={cn(
                'flex items-center gap-2 rounded-lg p-3',
                iceCream.disponibilidade_status === 'indisponivel'
                  ? 'bg-destructive/10 text-destructive'
                  : 'bg-yellow-100 text-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-200'
              )}
            >
              <AlertCircle className="size-4" />
              <span className="text-sm font-medium">
                {iceCream.disponibilidade_status === 'indisponivel'
                  ? 'Produto indisponível'
                  : iceCream.disponibilidade_observacao || 'Disponibilidade limitada'}
              </span>
            </div>
          )}

          {iceCream.metadata?.restricoes_alimentares &&
            iceCream.metadata.restricoes_alimentares.length > 0 && (
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-semibold">Restrições Alimentares</h4>
                <div className="flex flex-wrap gap-2">
                  {iceCream.metadata.restricoes_alimentares.map((restricao) => (
                    <Badge key={restricao} variant="secondary">
                      {restricao}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

          <Separator />

          <div className="flex flex-col gap-3">
            <h4 className="font-semibold">Ingredientes</h4>
            <div className="flex flex-col gap-2">
              <div className="bg-primary/10 rounded-lg p-3">
                <span className="text-sm font-medium">Ingrediente Principal: </span>
                <span className="text-sm">{iceCream.metadata.ingrediente_principal}</span>
              </div>
              {iceCream.metadata.ingredientes_secundarios &&
                iceCream.metadata.ingredientes_secundarios.length > 0 && (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">Ingredientes Secundários:</span>
                    <ul className="ml-4 list-disc text-sm">
                      {iceCream.metadata.ingredientes_secundarios.map((ing, idx) => (
                        <li key={idx}>{ing}</li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          </div>

          {iceCream.metadata?.alergenicos && iceCream.metadata.alergenicos.length > 0 && (
            <div className="flex flex-col gap-2">
              <h4 className="text-destructive font-semibold">Alergênicos</h4>
              <div className="flex flex-wrap gap-2">
                {iceCream.metadata.alergenicos.map((alergenico) => (
                  <Badge key={alergenico} variant="destructive">
                    {alergenico}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {renderPrices()}

          {renderNutritionalInfo()}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { IceCreamDetailModal };
