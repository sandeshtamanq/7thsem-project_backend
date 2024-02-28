import { IsNotEmpty } from 'class-validator';

export class KhaltiPaymentDto {
  @IsNotEmpty()
  return_url: string;

  @IsNotEmpty()
  website_url: string;

  @IsNotEmpty()
  purchase_order_id: string;

  @IsNotEmpty()
  purchase_order_name: string;

  @IsNotEmpty()
  amount: string;
}
