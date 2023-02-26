import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { UserEntity } from 'src/auth/models/entity/user.entity';
import { UserInterface } from 'src/auth/models/interface/user.interface';
import { UserRoles } from 'src/auth/models/interface/user.roles';
import { UserService } from '../service/user.service';

// This is test
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/role/:id')
  changeRole(
    @GetUser() user: UserInterface,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.changeRole(id, user);
  }

  @Get()
  @hasRoles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getAllUsers(): Promise<[UserEntity[], number]> {
    return this.userService.getAllUsers();
  }

  @Get('/status')
  // @hasRoles(UserRoles.ADMIN)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  getUserStat() {
    return this.userService.getUserStat();
  }
}
