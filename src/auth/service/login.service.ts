import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/entity/user.entity';
import { SignUpInterface } from '../models/interface/signup.interface';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}
  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async verifyUser(email: string, password: string): Promise<SignUpInterface> {
    const user: SignUpInterface = await this.userRepository.findOne({
      where: { email },
      select: [
        'email',
        'password',
        'lastName',
        'firstName',
        'address',
        'contactNumber',
      ],
    });

    if (!user || !(await this.comparePassword(password, user.password))) {
      throw new HttpException('Invalid Email or Password', 403);
    }

    return user;
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async generateJwt(payload: SignUpInterface): Promise<string> {
    return this.jwtService.sign({ payload });
  }
}
