import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/models/entity/user.entity';
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

  getCart(): Promise<CartEntity[]> {
    return this.cartRepository.find({
      relations: { products: true, user: true },
    });
  }

  async addToCart(user: UserEntity, cartDto: CartEntity): Promise<CartEntity> {
    const hasCart = await this.cartRepository.find({
      where: { userId: user.id },
    });
    console.log(cartDto.products);
    const newCart = new CartEntity();
    newCart.products = cartDto.products;
    newCart.user = user;

    // const newCart = this.cartRepository.create({
    //   user: user,
    //   products: cartDto.products,
    // });
    console.log(newCart);
    return this.cartRepository.save(newCart);
  }
}
