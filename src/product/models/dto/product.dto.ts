import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { BrandInterface } from 'src/brand/models/interface/brand.interface';

export class ProductDto {
  @IsNotEmpty()
  @ApiProperty()
  productName: string;

  @IsNotEmpty()
  @ApiProperty()
  productDescription: string;

  @IsNotEmpty()
  // @IsNumber()
  @ApiProperty()
  productPrice: number;

  @IsNotEmpty()
  @ApiProperty()
  productAmount: number;

  @ApiProperty()
  productImage: string;

  @ApiProperty()
  brandName: BrandInterface;
}
