import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserEntity } from 'src/auth/models/entity/user.entity';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
