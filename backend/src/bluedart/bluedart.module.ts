import { Module } from "@nestjs/common";
import { BLUEDART_SERVICE } from "./bluedart.constants";
import { IBluedartService } from "./service/bluedart.service";


@Module({
    imports: [],
    controllers: [],
    providers: [
        {
            provide: BLUEDART_SERVICE,
            useClass: IBluedartService,
        },
    ],
    exports: [
        {
            provide: BLUEDART_SERVICE,
            useClass: IBluedartService,
        },
    ]
})
export class BluedartModule { }