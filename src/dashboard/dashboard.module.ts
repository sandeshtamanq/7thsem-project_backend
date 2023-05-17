import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/models/entity/user.entity';
import { OrderEntity } from 'src/order/models/entity/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, OrderEntity])],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
