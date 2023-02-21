import { Module } from '@nestjs/common';
import { CartService } from './service/cart.service';
import { CartController } from './controller/cart.controller';
@Module({
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
