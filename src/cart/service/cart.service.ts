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

  getCart(id: number) {
    return this.cartRepository.find({
      where: { userId: id },
      relations: ['user', 'products'],
    });
  }

  addToCart(user: UserInterface, cartItem: CartInterface) {
    const newCart = this.cartRepository.create({
      products: cartItem.products,
      user: user,
    });
    return this.cartRepository.save(newCart);
  }
}
