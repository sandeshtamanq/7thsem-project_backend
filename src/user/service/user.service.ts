import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/models/entity/user.entity';
import { DataSource, getManager, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private dataSource: DataSource,
  ) {}

  getAllUsers(): Promise<[UserEntity[], number]> {
    return this.userRepository.findAndCount({
      order: {
        role: 'ASC',
        createdAt: 'DESC',
      },
    });
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
