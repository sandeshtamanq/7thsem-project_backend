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
  Patch,
  Put,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common/decorators';

import {
  DefaultValuePipe,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common/pipes';
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
import { CategoryValidationPipes } from '../pipes/category-validation.pipe';
import { FirebaseService } from '../service/firebase.service';
import { Request } from 'express';
import { ReviewService } from '../service/review.service';
import { ReviewDto } from '../models/dto/review.dto';
import { VerifyUserGuard } from '../guard/validate-user.guard';
import { UpdateDto } from '../models/dto/update.dto';

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    private firebaseService: FirebaseService,
    private reviewService: ReviewService,
  ) {}

  @Get('filter')
  filterPorducts(
    @Query('price', new DefaultValuePipe(-1), ParseIntPipe) price: number,
    @Query('brand', new DefaultValuePipe('')) brand: string,
  ) {
    return this.productService.filterProduct(brand, price);
  }

  /**
   *
   * @param page
   * @param limit
   * @returns product lists
   */
  @Get()
  getAllProducts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,

    @Req() req: Request,
  ) {
    return this.productService.getAllProducts({
      page,
      limit,
      route: `${req.protocol}://${req.get('Host')}${req.originalUrl}`,
    });
  }

  /**
   *
   * @Body file
   * @Body productDto
   * @returns adds products
   */

  @Post()
  @UseInterceptors(FileInterceptor('productImage'))
  @UsePipes(ValidationPipe)
  @hasRoles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addProducts(
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: UserInterface,
    @Body(CategoryValidationPipes) productDto: ProductDto,
  ): Promise<ProductEntity> {
    const imageUrl = await this.firebaseService.uploadFile(
      file,
      'product-images',
    );
    productDto.productImage = imageUrl;
    return this.productService.addProduct(user, productDto);
  }

  @Delete(':id')
  @hasRoles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  deleteProducts(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id);
  }

  /**
   *
   * @param id
   * @returns Single product
   */
  @Get(':id')
  getSingleProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductEntity> {
    return this.productService.getSingleProduct(id);
  }

  /*Review Controllers*/
  @UseGuards(JwtAuthGuard)
  @Post('review/:id')
  postReview(
    @Body() reviewDto: ReviewDto,
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserInterface,
  ) {
    return this.reviewService.postReview(reviewDto, id, user);
  }

  @UseGuards(JwtAuthGuard, VerifyUserGuard)
  @Delete('review/:id')
  deleteReview(@Param('id', ParseIntPipe) id: number) {
    this.reviewService.deleteReview(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRoles.ADMIN)
  @Put('/edit/:id')
  updateProduct(
    @Body() updateDto: UpdateDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.productService.updateProduct(id, updateDto);
  }
}
