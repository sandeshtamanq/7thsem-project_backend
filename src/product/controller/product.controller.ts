import { Controller, UseGuards } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { UserRoles } from 'src/auth/models/interface/user.roles';

@Controller('product')
// @hasRoles(UserRoles.ADMIN)
// @UseGuards(JwtAuthGuard, RolesGuard)
export class ProductController {
  @Get()
  getAllProducts() {}
}
