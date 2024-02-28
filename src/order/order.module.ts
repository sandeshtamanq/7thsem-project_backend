import { Module } from '@nestjs/common';
import { OrderService } from './service/order.service';
import { OrderController } from './controller/order.controller';
import TypeOrmConfig from 'src/typeorm/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './models/entity/order.entity';
import { CartEntity } from 'src/cart/models/entity/cart.entity';
import { ProductModule } from '../product/product.module';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, CartEntity]), PaymentModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
