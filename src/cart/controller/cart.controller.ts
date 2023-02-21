import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { UserInterface } from 'src/auth/models/interface/user.interface';
import { CartDto } from '../models/dto/cart.dto';
import { CartService } from '../service/cart.service';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCartItems(@GetUser() user: UserInterface) {
    return this.cartService.getCart(user.id);
  }

  @Post()
  addToCart(@GetUser() user: UserInterface, @Body() cartDto: CartDto) {
    return this.cartService.addToCart(user, cartDto);
  }
}
