import { Controller, Get, UseGuards } from '@nestjs/common';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { UserEntity } from 'src/auth/models/entity/user.entity';
import { UserRoles } from 'src/auth/models/interface/user.roles';
import { UserService } from '../service/user.service';

// This is test
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @hasRoles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getAllUsers(): Promise<UserEntity[]> {
    return this.userService.getAllUsers();
  }
}
