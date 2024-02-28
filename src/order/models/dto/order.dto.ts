import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductEntity } from 'src/product/models/entity/product.entity';
import { PaymentMode } from '../entity/paymentmode.enum';

export class OrderDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  totalSum: number;

  @IsNotEmpty()
  products: ProductEntity[];

  @IsOptional()
  @IsString()
  returnUrl: string;

  @IsOptional()
  @IsString()
  websiteUrl: string;

  @IsNotEmpty()
  @IsEnum(PaymentMode)
  paymentMode: PaymentMode;
}
