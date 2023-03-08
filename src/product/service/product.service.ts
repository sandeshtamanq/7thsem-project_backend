import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { UserInterface } from 'src/auth/models/interface/user.interface';
import { Repository } from 'typeorm';
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

  getSingleProduct(id: number) {
    return this.productRepository.findOne({
      where: { id },
      relations: ['brandName'],
    });
  }
}
