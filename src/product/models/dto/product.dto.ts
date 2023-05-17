import { IsNotEmpty, IsNumber } from 'class-validator';
import { BrandInterface } from 'src/brand/models/interface/brand.interface';

export class ProductDto {
  @IsNotEmpty()
  productName: string;

  @IsNotEmpty()
  productDescription: string;

  @IsNotEmpty()
  // @IsNumber()
  productPrice: number;

  @IsNotEmpty()
  productAmount: number;

  productImage: string;

  @IsNotEmpty()
  brandName: BrandInterface;
}
