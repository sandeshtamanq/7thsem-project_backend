import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
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
  getBrands(): Promise<BrandInterface[]> {
    return this.brandService.getBrands();
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
}
