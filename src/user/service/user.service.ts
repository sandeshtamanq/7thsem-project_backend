import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/models/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepositiry: Repository<UserEntity>,
  ) {}
  getAllUsers(): Promise<UserEntity[]> {
    return this.userRepositiry.find({
      order: {
        role: 'ASC',
      },
    });
  }
}
