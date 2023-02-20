import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from 'src/cart/models/entity/cart.entity';
import { AuthController } from './controller/auth.controller';
import { JwtAuthGuard } from './guard/jwt.guard';
import { JwtStrategy } from './guard/jwt.strategy';
import { UserEntity } from './models/entity/user.entity';
import { AuthService } from './service/auth.service';
import { LoginService } from './service/login.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWTSECRET,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([UserEntity, CartEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LoginService, JwtStrategy, JwtAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
