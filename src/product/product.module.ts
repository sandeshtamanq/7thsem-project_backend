import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserEntity } from 'src/auth/models/entity/user.entity';
import { BrandEntity } from 'src/brand/models/entity/brand.entity';
import { ProductController } from './controller/product.controller';
import { ProductEntity } from './models/entity/product.entity';
import { FirebaseService } from './service/firebase.service';
import { ProductService } from './service/product.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ProductEntity, BrandEntity]),
    AuthModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, FirebaseService],
})
export class ProductModule {}
