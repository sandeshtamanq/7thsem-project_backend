import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { UserInterface } from 'src/auth/models/interface/user.interface';
import { Like, Repository } from 'typeorm';
import { ProductEntity } from '../models/entity/product.entity';
import { ProductInterface } from '../models/interface/product.interface';
import { UpdateDto } from '../models/dto/update.dto';

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

  async filterProduct(searchTerm: string, price: number) {
    if (price > 0 && searchTerm.length > 0) {
      const getProduct = await this.productRepository
        .createQueryBuilder('product')
        .leftJoin('product.brandName', 'brand')
        .andWhere('brand.brandName ILike :searchTerm', { searchTerm })
        .orWhere('product.productDescription ILike :searchTerm', {
          searchTerm: `%${searchTerm}%`,
        })
        .orWhere('product.productName ILike :searchTerm', {
          searchTerm: `%${searchTerm}%`,
        })
        .getMany();

      return getProduct.filter((product) => product.productPrice <= price);
    } else if (price > 0) {
      return this.productRepository
        .createQueryBuilder('product')
        .leftJoin('product.brandName', 'brand')
        .where('product.productPrice <= :price', { price })
        .getMany();
    } else {
      return this.productRepository
        .createQueryBuilder('product')
        .leftJoin('product.brandName', 'brand')
        .where('brand.brandName ILike :searchTerm', { searchTerm })
        .orWhere('product.productDescription ILike :searchTerm', {
          searchTerm: `%${searchTerm}%`,
        })
        .orWhere('product.productName ILike :searchTerm', {
          searchTerm: `%${searchTerm}%`,
        })
        .getMany();
    }
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
  }

  async updateProduct(id: number, updateDto: UpdateDto) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        reviews: false,
      },
    });
    product.brandName = updateDto.brandName;
    product.productAmount = updateDto.productAmount;
    product.productName = updateDto.productName;
    product.productDescription = updateDto.productDescription;
    product.productPrice = updateDto.productPrice;
    await this.productRepository.save(product);
    return {
      message: 'product updated successfully',
    };
  }
}
