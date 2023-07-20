import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.HOST || 'localhost',
      port: +process.env.PGPORT,
      username: process.env.PGUSERNAME,
      password: process.env.PGPASSWORD,
      database: process.env.PGDDATABASE,
      entities: [__dirname + '/../**/models/entity/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    };
  }
}

export const typeOrmConfigAsync = () => {
  return () => {
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    };
  };
};
