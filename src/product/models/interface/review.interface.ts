import { ProductInterface } from './product.interface';

export interface ReviewInterface {
  id?: number;
  review?: string;
  product?: ProductInterface;
}
