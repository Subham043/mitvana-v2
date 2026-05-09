import { Inject, Injectable } from '@nestjs/common';
import { DashboardServiceInterface } from '../interface/dashboard.service.interface';
import { DASHBOARD_REPOSITORY } from '../dashboard.constants';
import { DashboardRepositoryInterface } from '../interface/dashboard.repository.interface';
import { DashboardEntity } from '../entity/dashboard.entity';

@Injectable()
export class DashboardService implements DashboardServiceInterface {

  constructor(
    @Inject(DASHBOARD_REPOSITORY) private readonly dashboardRepository: DashboardRepositoryInterface,
  ) { }

  async getStats(): Promise<DashboardEntity> {
    return await this.dashboardRepository.getStats();
  }

}
