import { DashboardEntity } from "../entity/dashboard.entity";

export interface DashboardServiceInterface {
    getStats(): Promise<DashboardEntity>;
}
