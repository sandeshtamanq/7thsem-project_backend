import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/entity/user.entity';
import { UserInterface } from '../models/interface/user.interface';
import { LoginService } from './login.service';
import { LoginDto } from '../models/dto/login.dto';
import { SignUpDto } from '../models/dto/signup.dto';
import { MailService } from 'src/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @Inject(LoginService) private loginService: LoginService,
    private mailService: MailService,
  ) {}

  /* 
    User Login 
  */

  async login(loginDto: LoginDto) {
    const user = await this.loginService.verifyUser(
      loginDto.email,
      loginDto.password,
    );
    const { password, ...payload } = user;
    const accessToken = await this.loginService.generateJwt(payload);
    return { accessToken };
  }
  /* User Login */

  /*
    User Sign Up
  */
  async signUp(signUpDto: UserInterface) {
    const hashedPassword = await this.loginService.hashPassword(
      signUpDto.password,
    );
    // this.mailService.welcomeMail(signUpDto.firstName, signUpDto.email);
    const newUser = this.userRepository.create({
      ...signUpDto,
      password: hashedPassword,
    });

    try {
      const savedUser = await this.userRepository.save(newUser);
      const { password, ...result } = savedUser;
      return result;
    } catch (err) {
      if (err.code === '23505') {
        throw new HttpException('The email is already taken', 409);
      }
      throw new HttpException('Bad Request', 400);
    }
  }
  /* User Sign Up */
}
