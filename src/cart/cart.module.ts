import { Module } from '@nestjs/common';
import { CartService } from './service/cart.service';
import { CartController } from './controller/cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './models/entity/cart.entity';
import { ProductEntity } from 'src/product/models/entity/product.entity';
@Module({
  imports: [TypeOrmModule.forFeature([CartEntity, ProductEntity])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
