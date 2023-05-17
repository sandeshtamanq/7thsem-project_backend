import { IsNotEmpty, IsNumber } from 'class-validator';
import { BrandEntity } from 'src/brand/models/entity/brand.entity';
import { BrandInterface } from 'src/brand/models/interface/brand.interface';

export class UpdateDto {
  productName?: string;

  productDescription?: string;

  productPrice?: number;

  productAmount?: number;

  productImage?: string;

  brandName?: BrandEntity;
}
