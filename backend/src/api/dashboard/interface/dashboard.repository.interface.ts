import { CustomQueryCacheConfig } from "src/utils/types";
import { DashboardEntity } from "../entity/dashboard.entity";

export interface DashboardRepositoryInterface {
    getStats(cacheConfig?: CustomQueryCacheConfig): Promise<DashboardEntity>;
}