import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInterface } from 'src/auth/models/interface/user.interface';
import { Repository } from 'typeorm';
import { CartEntity } from '../models/entity/cart.entity';
import { CartInterface } from '../models/interface/cart.interface';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
  ) {}

  getCart(): Promise<CartInterface[]> {
    return this.cartRepository.find({
      relations: { products: true, user: true },
    });
  }

  addToCart(
    user: UserInterface,
    cartDto: CartInterface,
  ): Promise<CartInterface> {
    console.log(cartDto);
    const newCart = this.cartRepository.create({
      amount: cartDto.amount,
      user: user,
      products: [cartDto.product],
    });
    return this.cartRepository.save(newCart);
  }
}
