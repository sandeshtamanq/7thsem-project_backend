import { Injectable } from '@nestjs/common';
import { OrderDto } from '../models/dto/order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryStatus, OrderEntity } from '../models/entity/order.entity';
import { Repository } from 'typeorm';
import { CartEntity } from 'src/cart/models/entity/cart.entity';
import { ProductService } from '../../product/service/product.service';
import { PaymentMode } from '../models/entity/paymentmode.enum';
import { PaymentService } from '../../payment/service/payment.service';
import { UserInterface } from '../../auth/models/interface/user.interface';
import uuidv4 from '../../utils/uuidv4';

@Injectable()
export class OrderService {
  constructor(
    private readonly paymentService: PaymentService,
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
  ) {}

  async getRecentOrders() {
    return (
      this.orderRepository
        .createQueryBuilder('order')
        .leftJoin('order.user', 'user')
        .addSelect([
          'user.id',
          'user.firstName',
          'user.lastName',
          'user.email',
          'user.contactNumber',
        ])
        .leftJoin('order.products', 'product')
        .addSelect(['product.productName'])
        // .limit(10)
        .orderBy('order.createdAt', 'DESC')
        .orderBy('order.deliveryStatus', 'DESC')
        .getMany()
    );
  }

  async getOrder(id: number) {
    return this.orderRepository
      .createQueryBuilder('order')
      .where('order.userId = :id', { id })
      .leftJoinAndSelect('order.products', 'products')
      .orderBy('order.deliveryStatus', 'DESC')
      .getMany();
  }
  //

  async addOrder(orderDto: OrderDto, user: UserInterface) {
    let response: any;
    const newOrder = this.orderRepository.create({
      products: orderDto.products,
      amount: orderDto.amount,
      totalSum: orderDto.totalSum,
      userId: user.id,
      paymentMode: orderDto.paymentMode,
    });

    if (orderDto.paymentMode === PaymentMode.KHALTI) {
      response = await this.paymentService.initiatePayment({
        amount: '10000',
        purchase_order_id: uuidv4(),
        purchase_order_name: `${user.firstName}'s order`,
        return_url: orderDto.returnUrl,
        website_url: orderDto.websiteUrl,
      });
      newOrder.paymentMode = PaymentMode.KHALTI;
      newOrder.pidx = response.data.pidx;
      await this.cartRepository.delete({ userId: user.id });

      await this.orderRepository.save(newOrder);
      return { paymentUrl: response.data.payment_url };
    }

    await this.cartRepository.delete({ userId: user.id });

    return this.orderRepository.save(newOrder);
  }

  updatePaymentStatus(id: number) {
    return this.orderRepository.update(id, {
      payment: true,
    });
  }

  updateStatus(id: number, status: DeliveryStatus) {
    return this.orderRepository.update(id, {
      deliveryStatus: status,
    });
  }
}
