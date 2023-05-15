import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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
  addOrder(@Body() orderDto: OrderDto, @GetUser() user: UserInterface) {
    return this.orderService.addOrder(orderDto, user.id);
  }
}
