import type { IceCream } from '../../types/models';

export interface IceCreamCardProps {
  iceCream: IceCream;
  onClick?: (iceCream: IceCream) => void;
  className?: string;
}
