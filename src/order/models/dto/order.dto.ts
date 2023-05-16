import { IsNotEmpty, IsNumber } from 'class-validator';
import { ProductEntity } from 'src/product/models/entity/product.entity';

export class OrderDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  totalSum: number;

  @IsNotEmpty()
  products: ProductEntity[];
}
