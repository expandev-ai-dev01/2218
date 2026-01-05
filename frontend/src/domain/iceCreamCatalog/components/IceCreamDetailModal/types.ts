import type { IceCream } from '../../types/models';

export interface IceCreamDetailModalProps {
  iceCream: IceCream | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
