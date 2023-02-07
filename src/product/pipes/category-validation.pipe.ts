import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from 'src/brand/models/entity/brand.entity';
import { BrandInterface } from 'src/brand/models/interface/brand.interface';
import { Repository } from 'typeorm';

export class CategoryValidationPipes implements PipeTransform {
  constructor(
    @InjectRepository(BrandEntity)
    private brandRepository: Repository<BrandEntity>,
  ) {}
  async transform(value: any, metadata: ArgumentMetadata) {
    const { valid, brandObj } = await this.isCategoryValid(value.brandName);
    if (!valid) {
      throw new BadRequestException(
        `${value.brandName} is an invalid category`,
      );
    }
    const { brandName, ...rest } = value;
    return { ...rest, brandName: brandObj };
  }

  private async isCategoryValid(
    value: any,
  ): Promise<{ brandObj: BrandInterface; valid: boolean }> {
    const { categoryLists, categories } = await this.getCategoryList();
    const idx = categoryLists.indexOf(value);
    const brand = categories.filter((category) => category.brandName === value);
    const brandObj = brand.reduce((acc, current) => {
      return { ...current };
    }, {});

    return { brandObj, valid: idx !== -1 };
  }

  private async getCategoryList(): Promise<{
    categoryLists: string[];
    categories: BrandInterface[];
  }> {
    const categories = await this.brandRepository.find();
    const categoryLists = categories.reduce((acc, current) => {
      return [...acc, current['brandName']];
    }, []);
    return { categoryLists, categories };
  }
}
