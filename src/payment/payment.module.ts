import { Module } from '@nestjs/common';
import { PaymentService } from './service/payment.service';
import { HttpModule } from '@nestjs/axios';
import { PaymentController } from './controller/payment.controller';
import { OrderModule } from '../order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../order/models/entity/order.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([OrderEntity])],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
