import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/models/entity/user.entity';
import { UserInterface } from 'src/auth/models/interface/user.interface';
import { Repository } from 'typeorm';
import { SearchEntity } from '../models/entity/search.entity';
import { SearchInterface } from '../models/interface/search.interface';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(SearchEntity)
    private searchRepository: Repository<SearchEntity>,
  ) {}
  getSearchList(userId: number): Promise<SearchInterface[]> {
    return this.searchRepository.find({ where: { userId } });
  }

  addSearch(user: UserInterface, search: SearchInterface) {
    const newSearchItem = this.searchRepository.create({
      search: search.search,
      userId: user.id,
    });
    return this.searchRepository.save(newSearchItem);
  }
}
