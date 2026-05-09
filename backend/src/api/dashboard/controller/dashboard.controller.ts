import { Controller, Post, Inject, Delete, Param, Get, Put, UseGuards, Query, Res } from '@nestjs/common';
import { DashboardServiceInterface } from '../interface/dashboard.service.interface';
import { Role } from 'src/auth/decorators/role.decorator';
import { Verified } from 'src/auth/decorators/verified.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { VerifiedGuard } from 'src/auth/guards/verified.guard';
import { AccessTokenGuard } from 'src/auth/guards/access_token.guard';
import { BlockedGuard } from 'src/auth/guards/blocked.guard';
import { DASHBOARD_SERVICE } from '../dashboard.constants';

@Controller({
  version: '1',
  path: 'dashboard',
})
@Verified()
@Role("ADMIN")
@UseGuards(AccessTokenGuard, BlockedGuard, VerifiedGuard, RolesGuard)
export class DashboardController {
  constructor(@Inject(DASHBOARD_SERVICE) private readonly dashboardService: DashboardServiceInterface) { }

  @Get('/')
  async getStats() {
    return await this.dashboardService.getStats();
  }
}
