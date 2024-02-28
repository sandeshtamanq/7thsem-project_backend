import { IsNotEmpty } from 'class-validator';

export class KhaltiLookupPaymentDto {
  @IsNotEmpty()
  pidx: string;
}
