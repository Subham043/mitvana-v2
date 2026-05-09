import { DashboardEntity } from "../entity/dashboard.entity";

export interface DashboardRepositoryInterface {
    getStats(): Promise<DashboardEntity>;
}