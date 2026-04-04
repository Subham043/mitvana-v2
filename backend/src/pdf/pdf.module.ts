import { Global, Module } from "@nestjs/common";
import { OrderPdfService } from "./services/order.pdf.service";

@Global()
@Module({
    providers: [OrderPdfService],
    exports: [OrderPdfService],
})
export class PdfModule { }
