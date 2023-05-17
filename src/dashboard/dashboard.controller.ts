import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { UserRoles } from 'src/auth/models/interface/user.roles';

@Controller('dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@hasRoles(UserRoles.ADMIN)
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get()
  getDashboardData() {
    return this.dashboardService.getDashboardData();
  }
}
