import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { UserRoles } from 'src/auth/models/interface/user.roles';
import { BrandDto } from '../models/dto/brand.dto';
import { BrandInterface } from '../models/interface/brand.interface';
import { BrandService } from '../service/brand.service';

@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @Get()
  getBrands(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<BrandInterface>> {
    limit = limit > 100 ? 100 : limit;
    return this.brandService.getBrands({
      limit,
      page,
      route: 'http://localhost:3000/api/brand',
    });
  }

  @Post()
  @UsePipes(ValidationPipe)
  addBrand(@Body() brandDto: BrandDto): Promise<BrandInterface> {
    return this.brandService.addBrand(brandDto);
  }

  @Delete('/:id')
  @hasRoles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  deleteBrand(@Param('id', ParseIntPipe) id: number) {
    return this.brandService.deleteBrand(id);
  }

  @Put(':id')
  updateBrand(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: BrandDto,
  ) {
    return this.brandService.updateBrand(id, updateDto);
  }

  @Get('/getAll')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRoles.ADMIN)
  getAllBrands() {
    return this.brandService.getAllBrands();
  }
}
