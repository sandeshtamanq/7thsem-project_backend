import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserEntity } from 'src/auth/models/entity/user.entity';
import { BrandEntity } from 'src/brand/models/entity/brand.entity';
import { ProductController } from './controller/product.controller';
import { ProductEntity } from './models/entity/product.entity';
import { ReviewEntity } from './models/entity/review.entity';
import { FirebaseService } from './service/firebase.service';
import { ProductService } from './service/product.service';
import { ReviewService } from './service/review.service';
import { SupabaseService } from './service/supabase.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ProductEntity,
      BrandEntity,
      ReviewEntity,
    ]),
    AuthModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, FirebaseService, ReviewService, SupabaseService],
  exports: [ProductService],
})
export class ProductModule {}
