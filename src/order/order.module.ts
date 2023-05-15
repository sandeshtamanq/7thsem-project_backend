import { Module } from '@nestjs/common';
import { OrderService } from './service/order.service';
import { OrderController } from './controller/order.controller';
import TypeOrmConfig from 'src/typeorm/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './models/entity/order.entity';
import { CartEntity } from 'src/cart/models/entity/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, CartEntity])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
