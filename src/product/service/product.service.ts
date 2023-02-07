import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  getAllProducts(): Promise<ProductEntity[]> {
    return this.productRepository.find({
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
}
