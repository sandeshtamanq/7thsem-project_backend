import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './auth/models/entity/user.entity';
import { ProductEntity } from './product/models/entity/product.entity';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: 'postgres',
          // host: process.env.DB_HOST || 'localhost',
          // port: parseInt(process.env.DB_PORT),
          // username: process.env.DB_USER,
          // password: process.env.DB_PASSWORD,
          // database: process.env.DB_NAME,
          // entities: [__dirname + './**/models/entity/*.entity{.ts,.js}'],
          // entities: [UserEntity, ProductEntity],
          url: process.env.DATABASE_URL,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    ProductModule,
    UserModule,
    CategoryModule,
    BrandModule,
    CartModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
