import { Injectable } from '@nestjs/common';
import { OrderDto } from '../models/dto/order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../models/entity/order.entity';
import { Repository } from 'typeorm';
import { CartEntity } from 'src/cart/models/entity/cart.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
  ) {}

  async getRecentOrders() {
    return this.orderRepository
      .createQueryBuilder('order')
      .leftJoin('order.user', 'user')
      .addSelect(['user.firstName'])
      .leftJoin('order.products', 'product')
      .addSelect(['product.productName'])
      .limit(10)
      .getMany();
  }

  async getOrder(id: number) {
    return this.orderRepository
      .createQueryBuilder('order')
      .where('order.userId = :id', { id })
      .leftJoinAndSelect('order.products', 'products')
      .getMany();
  }

  async addOrder(orderDto: OrderDto, id: number) {
    const newOrder = this.orderRepository.create({
      products: orderDto.products,
      amount: orderDto.amount,
      totalSum: orderDto.totalSum,
      userId: id,
    });
    await this.cartRepository.delete({ userId: id });

    return this.orderRepository.save(newOrder);
  }
}
