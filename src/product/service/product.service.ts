import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { UserInterface } from 'src/auth/models/interface/user.interface';
import { LessThanOrEqual, Like, Repository } from 'typeorm';
import { ProductEntity } from '../models/entity/product.entity';
import { ProductInterface } from '../models/interface/product.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  getAllProducts(
    options: IPaginationOptions,
  ): Promise<Pagination<ProductEntity>> {
    return paginate<ProductEntity>(this.productRepository, options, {
      relations: ['brandName'],
    });
  }

  filterProduct(brand: string, price: number) {
    if (price > 0) {
      return this.productRepository.find({
        select: ['brandName'],
        where: {
          productDescription: Like(`%${brand}%`),
          productPrice: LessThanOrEqual(price),
        },
      });
    }
    return this.productRepository.find({
      select: ['brandName'],
      where: {
        productDescription: Like(`%${brand}%`),
      },
    });
  }

  addProduct(
    user: UserInterface,
    productDto: ProductInterface,
  ): Promise<ProductEntity> {
    productDto.addedBy = user;
    return this.productRepository.save(productDto);
  }

  deleteProduct(id: number) {
    return this.productRepository.delete(id);
  }

  // test
  getSingleProduct(id: number) {
    return this.productRepository
      .createQueryBuilder('product')
      .where('product.id = :id', { id })
      .leftJoinAndSelect('product.brandName', 'brand')
      .leftJoinAndSelect('product.reviews', 'reviews')
      .leftJoinAndSelect('reviews.user', 'user')
      .orderBy('reviews.createdAt', 'DESC')
      .getOne();
    // return this.productRepository.findOne({
    //   where: { id },
    //   relations: ['brandName', 'reviews', 'reviews.user'],
    // });
  }
}
