import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandController } from './controller/brand.controller';
import { BrandEntity } from './models/entity/brand.entity';
import { BrandService } from './service/brand.service';

@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity])],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
