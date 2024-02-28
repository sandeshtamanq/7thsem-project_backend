import { Injectable } from '@nestjs/common';
import { KhaltiPaymentDto } from '../models/dto/khalti-payment.dto';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { KhaltiLookupPaymentDto } from '../models/dto/khalti-lookup.dto';
import { OrderService } from '../../order/service/order.service';
import { OrderEntity } from '../../order/models/entity/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PaymentService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) {}
  //
  async initiatePayment(initiatePaymentDto: KhaltiPaymentDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${process.env.KHALTI_URL}/epayment/initiate/`,
          {
            ...initiatePaymentDto,
          },
          {
            headers: {
              Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      return response;
    } catch (err) {
      console.log(err);
      return err.response;
    }
  }

  async lookupKhaltiPayment(lookupPaymentDto: KhaltiLookupPaymentDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${process.env.KHALTI_URL}/epayment/lookup/`,
          { pidx: lookupPaymentDto.pidx },
          {
            headers: {
              Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      const order = await this.orderRepository.findOne({
        where: { pidx: lookupPaymentDto.pidx },
      });

      await this.orderRepository.update(order.id, {
        payment: true,
      });

      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
}
