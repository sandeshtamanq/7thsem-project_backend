import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInterface } from 'src/auth/models/interface/user.interface';
import { ProductEntity } from 'src/product/models/entity/product.entity';
import { ProductInterface } from 'src/product/models/interface/product.interface';
import { Repository } from 'typeorm';
import { CartEntity } from '../models/entity/cart.entity';
import { CartInterface } from '../models/interface/cart.interface';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  getCart(id: number) {
    return this.cartRepository.find({
      where: { userId: id },
      relations: ['product'],
    });
  }

  async addToCart(user: UserInterface, cartItem: CartInterface) {
    const product: ProductInterface = await this.productRepository.findOne({
      where: { id: cartItem.productId },
    });
    const cartList: CartInterface = await this.cartRepository.findOne({
      where: { userId: user.id, productId: cartItem.productId },
    });
    product.productAmount = product.productAmount - cartItem.amount;
    await this.productRepository.update(product.id, product);
    if (cartList) {
      const cartId = cartList.id;
      cartList.amount = cartItem.amount + cartList.amount;
      return this.cartRepository.update(cartId, cartList);
    }
    const newCart = this.cartRepository.create({
      product: cartItem.product,
      user: user,
      amount: cartItem.amount,
      productId: cartItem.productId,
    });
    return this.cartRepository.save(newCart);
  }
}
