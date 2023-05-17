import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/models/entity/user.entity';
import { OrderEntity } from 'src/order/models/entity/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) {}
  async getDashboardData() {
    const totalUsers = await this.userRepository.count();
    const totalReveneu = await this.orderRepository
      .createQueryBuilder('order')
      .select('SUM(order.totalSum)', 'total')
      .getRawOne();
    const totalOrders = await this.orderRepository.count();
    const result = await this.userRepository
      .createQueryBuilder('user')
      .select('DATE(user.createdAt)', 'date')
      .addSelect('COUNT(user)', 'userCount')
      //   .orderBy('date', 'DESC')
      .groupBy('date')
      .getRawMany();

    const userData = result.map((row) => ({
      date: row.date,
      userCount: row.userCount,
    }));

    return {
      totalUsers,
      totalReveneu: totalReveneu.total,
      totalOrders,
      userData,
    };
  }
}
