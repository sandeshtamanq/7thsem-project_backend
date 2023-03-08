import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from 'nestjs-typeorm-paginate/dist/interfaces';
import { paginate } from 'nestjs-typeorm-paginate/dist/paginate';
import { Pagination } from 'nestjs-typeorm-paginate/dist/pagination';
import { UserEntity } from 'src/auth/models/entity/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private dataSource: DataSource,
  ) {}

  getAllUsers(options: IPaginationOptions): Promise<Pagination<UserEntity>> {
    return paginate<UserEntity>(this.userRepository, options);
  }

  async getUserStat(): Promise<{ day: any; number_of_users: string }[]> {
    const userData = await this.dataSource.query(`SELECT 
      DATE_TRUNC('day', "createdAt") AS "day", 
      COUNT("createdAt") AS "number_of_users"
      FROM "users"
      GROUP BY DATE_TRUNC('day', "createdAt");`);
    return userData.reverse();
  }
}
