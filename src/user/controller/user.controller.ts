import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { UserEntity } from 'src/auth/models/entity/user.entity';
import { UserRoles } from 'src/auth/models/interface/user.roles';
import { UserService } from '../service/user.service';
import { Pagination } from 'nestjs-typeorm-paginate';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @hasRoles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getAllUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<UserEntity>> {
    limit = limit > 100 ? 100 : limit;
    return this.userService.getAllUsers({
      page,
      limit,
      route: 'http://localhost:3000/api/user',
    });
  }

  @Get('/status')
  @hasRoles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getUserStat() {
    return this.userService.getUserStat();
  }
}
