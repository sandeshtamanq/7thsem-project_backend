import { IsNotEmpty } from 'class-validator';
import { ProductInterface } from 'src/product/models/interface/product.interface';

export class CartDto {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  amount: number;
}
