import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { OrderDto } from '../models/dto/order.dto';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { UserInterface } from 'src/auth/models/interface/user.interface';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { UserRoles } from 'src/auth/models/interface/user.roles';

@Controller('order')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(RolesGuard)
  @hasRoles(UserRoles.ADMIN)
  @Get('recent')
  getRecentOrders() {
    return this.orderService.getRecentOrders();
  }

  @Get()
  getOrder(@GetUser() user: UserInterface) {
    return this.orderService.getOrder(user.id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  addOrder(@Body() orderDto: OrderDto, @GetUser() user: UserInterface) {
    if (
      orderDto.products.length === 0 ||
      orderDto.amount < 1 ||
      orderDto.totalSum < 1
    ) {
      throw new HttpException('Please add some product', 400);
    }
    return this.orderService.addOrder(orderDto, user.id);
  }
}
