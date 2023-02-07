import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandEntity } from '../models/entity/brand.entity';
import { BrandInterface } from '../models/interface/brand.interface';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(BrandEntity)
    private brandRepository: Repository<BrandEntity>,
  ) {}

  getBrands(): Promise<BrandInterface[]> {
    return this.brandRepository.find();
  }

  async addBrand(brandDto: BrandInterface): Promise<BrandInterface> {
    const newBrand = new BrandEntity();
    newBrand.brandName = brandDto.brandName;
    try {
      const savedBrand: BrandInterface = await this.brandRepository.save(
        newBrand,
      );
      return savedBrand;
    } catch (err) {
      if (err.code === '23505')
        throw new HttpException('Category already exists', 409);

      throw new HttpException('Bad Request', 400);
    }
  }

  deleteBrand(id: number) {
    return this.brandRepository.delete(id);
  }
}
