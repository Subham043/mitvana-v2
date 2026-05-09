import { Module } from '@nestjs/common';
import { DashboardController } from './controller/dashboard.controller';
import { DASHBOARD_REPOSITORY, DASHBOARD_SERVICE } from './dashboard.constants';
import { DashboardService } from './service/dashboard.service';
import { DashboardRepository } from './repository/dashboard.repository';

@Module({
  imports: [],
  controllers: [DashboardController],
  providers: [
    {
      provide: DASHBOARD_SERVICE,
      useClass: DashboardService,
    },
    {
      provide: DASHBOARD_REPOSITORY,
      useClass: DashboardRepository,
    },
  ],
})
export class DashboardModule { }
