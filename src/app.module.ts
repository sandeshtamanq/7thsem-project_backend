import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { BrandModule } from './brand/brand.module';
import { CartModule } from './cart/cart.module';
import { SearchModule } from './search/search.module';
import { OrderModule } from './order/order.module';
import { OrderEntity } from './order/models/entity/order.entity';
import { ContactModule } from './contact/contact.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ContactEntity } from './contact/models/entity/contact.entity';

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
          entities: [
            __dirname + './**/models/entity/*.entity{.ts,.js}',
            OrderEntity,
            ContactEntity,
          ],
          // entities: [UserEntity, ProductEntity],
          url: process.env.DATABASE_URL,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    ProductModule,
    UserModule,
    BrandModule,
    CartModule,
    SearchModule,
    OrderModule,
    ContactModule,
    DashboardModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
