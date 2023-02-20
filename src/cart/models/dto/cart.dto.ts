import { ProductInterface } from 'src/product/models/interface/product.interface';

export class CartDto {
  products: ProductInterface;
  amount: number;
}
