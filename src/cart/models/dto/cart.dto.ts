import { ProductEntity } from 'src/product/models/entity/product.entity';
import { ProductInterface } from 'src/product/models/interface/product.interface';

export class CartDto {
  products: ProductEntity[];
}
