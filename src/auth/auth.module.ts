import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controller/auth.controller';
import { JwtAuthGuard } from './guard/jwt.guard';
import { JwtStrategy } from './guard/jwt.strategy';
import { UserEntity } from './models/entity/user.entity';
import { AuthService } from './service/auth.service';
import { LoginService } from './service/login.service';
import { MailService } from 'src/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: process.env.MAIL_HOST,
          port: +process.env.MAIL_PORT,
          secure: +process.env.MAIL_PORT === 465,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
        },
        defaults: {
          from: '"Sandesh Tamang" <noreply@example.com>',
        },
        template: {
          dir: __dirname + '../../../templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    JwtModule.register({
      secret: process.env.JWTSECRET,
      signOptions: {
        expiresIn: '7d',
      },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LoginService,
    JwtStrategy,
    JwtAuthGuard,
    MailService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
