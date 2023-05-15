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

  async getCart(id: number) {
    let subTotal: number = 0;
    const cartLists = await this.cartRepository
      .createQueryBuilder('cart')
      .where('cart.userId = :id', { id })
      .leftJoinAndSelect('cart.product', 'product')
      .leftJoinAndSelect('product.brandName', 'brand')
      .getMany();
    if (cartLists.length > 0) {
      cartLists.forEach((cartItem) => {
        subTotal = subTotal + cartItem.amount * cartItem?.product.productPrice;
      });
    }
    return {
      cartLists,
      subTotal,
    };
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

  async getCartAmount(id: number) {
    let totalCartAmount = 0;
    const cartAmount = await this.cartRepository
      .createQueryBuilder('cart')
      .select('cart.amount')
      .where('cart.userId = :id', { id })
      .getMany();

    cartAmount.map(({ amount }) => {
      totalCartAmount = totalCartAmount + amount;
    });
    return { amount: totalCartAmount };
  }
}
