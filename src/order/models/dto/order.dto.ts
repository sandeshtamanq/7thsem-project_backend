import { ProductEntity } from 'src/product/models/entity/product.entity';

export class OrderDto {
  amount: number;
  totalSum: number;
  products: ProductEntity[];
}
