import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchController } from './controller/search.controller';
import { SearchEntity } from './models/entity/search.entity';
import { SearchService } from './service/search.service';

@Module({
  imports: [TypeOrmModule.forFeature([SearchEntity])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
