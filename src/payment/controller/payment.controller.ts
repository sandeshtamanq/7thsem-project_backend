import { Body, Controller, Post } from '@nestjs/common';
import { KhaltiLookupPaymentDto } from '../models/dto/khalti-lookup.dto';
import { PaymentService } from '../service/payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Post('validate-payment')
  validatePayment(@Body() validatePayment: KhaltiLookupPaymentDto) {
    return this.paymentService.lookupKhaltiPayment(validatePayment);
  }
}
