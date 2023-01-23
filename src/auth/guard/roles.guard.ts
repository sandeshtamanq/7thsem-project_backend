import { CanActivate, Injectable } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { Reflector } from '@nestjs/core';
import { Inject } from '@nestjs/common/decorators';
import { ExecutionContext } from '@nestjs/common/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/entity/user.entity';
import { Repository } from 'typeorm';
import { UserInterface } from '../models/interface/user.interface';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = ctx.switchToHttp().getRequest();
    let hasAccess: boolean;
    try {
      const currentUser: UserInterface = await this.userRepository.findOne({
        where: { email: user.email },
      });
      hasAccess = requiredRoles.indexOf(currentUser.role) > -1;
    } catch (err) {
      console.log(err);
    }
    return hasAccess;
  }
}
