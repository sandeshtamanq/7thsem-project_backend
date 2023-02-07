import {
  Body,
  Controller,
  UseGuards,
  UsePipes,
  Delete,
  Get,
  Post,
} from '@nestjs/common';
import {
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common/decorators';

import { ParseIntPipe, ValidationPipe } from '@nestjs/common/pipes';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { UserInterface } from 'src/auth/models/interface/user.interface';
import { UserRoles } from 'src/auth/models/interface/user.roles';
import { ProductDto } from '../models/dto/product.dto';
import { ProductEntity } from '../models/entity/product.entity';
import { ProductService } from '../service/product.service';
import { diskStorage } from 'multer';
const path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { CategoryValidationPipes } from '../pipes/category-validation.pipe';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get()
  getAllProducts(): Promise<ProductEntity[]> {
    return this.productService.getAllProducts();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('productImage', {
      storage: diskStorage({
        destination: './uploads/product-images',
        filename: (req, file, cb) => {
          const filename: string =
            path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
          const extension: string = path.parse(file.originalname).ext;

          cb(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  @UsePipes(ValidationPipe)
  @hasRoles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  addProducts(
    @UploadedFile() file,
    @GetUser() user: UserInterface,
    @Body(CategoryValidationPipes) productDto: ProductDto,
  ): Promise<ProductEntity> {
    productDto.productImage = file.filename;
    return this.productService.addProduct(user, productDto);
  }

  @Delete(':id')
  @hasRoles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  deleteProducts(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id);
  }
}
