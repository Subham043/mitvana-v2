import { Controller, Inject, Get, UseGuards, Query, Param, Patch, Body, Res } from '@nestjs/common';
import { VineValidationPipe } from 'src/utils/validator/pipe/vine_validation.pipe';
import { Role } from 'src/auth/decorators/role.decorator';
import { Verified } from 'src/auth/decorators/verified.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { VerifiedGuard } from 'src/auth/guards/verified.guard';
import { AccessTokenGuard } from 'src/auth/guards/access_token.guard';
import { BlockedGuard } from 'src/auth/guards/blocked.guard';
import { OrderFilterDto, orderFilterDtoValidator } from '../schema/order-filter.schema';
import { ORDER_SERVICE } from '../order.constant';
import { OrderServiceInterface } from '../interface/order.service.interface';
import { OrderUpdateStatusDto, orderUpdateStatusDtoValidator } from '../schema/order-update-status.schema';
import { FastifyReply } from 'fastify';
import { OrderPdfService } from 'src/pdf/services/order.pdf.service';

@Controller({
  version: '1',
  path: 'order',
})
@Verified()
@Role("ADMIN")
@UseGuards(AccessTokenGuard, BlockedGuard, VerifiedGuard, RolesGuard)
export class OrderController {
  constructor(@Inject(ORDER_SERVICE) private readonly orderService: OrderServiceInterface, private readonly orderPdfService: OrderPdfService) { }

  @Get('/')
  async getAllOrders(@Query(new VineValidationPipe(orderFilterDtoValidator)) query: OrderFilterDto) {
    return await this.orderService.getAll(query);
  }

  @Get('/:id')
  async getOrder(@Param('id') id: string) {
    return await this.orderService.getById(id);
  }

  @Patch('/status/:id')
  async updateOrderStatus(@Body(new VineValidationPipe(orderUpdateStatusDtoValidator)) orderUpdateStatusDto: OrderUpdateStatusDto, @Param('id') id: string) {
    return await this.orderService.updateOrderStatus(id, orderUpdateStatusDto);
  }

  @Get('/pdf/:id')
  async pdf(@Param('id') id: string, @Res() reply: FastifyReply) {
    const order = await this.orderService.getById(id);
    const buffer = await this.orderPdfService.generateInvoicePdf(order);

    reply.header(
      'Content-Type',
      'application/pdf',
    )

    reply.header(
      'Content-Length',
      buffer.length,
    )

    reply.header(
      'Content-Disposition',
      'attachment; filename="invoice.pdf"',
    )

    return reply.send(buffer)
    // try {
    // } catch (error) {
    //   console.log(error)
    //   throw error
    // }
  }

  @Get('/export')
  async export(@Query(new VineValidationPipe(orderFilterDtoValidator)) query: OrderFilterDto, @Res() reply: FastifyReply) {
    const stream = await this.orderService.exportOrders(query)

    reply.header(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )

    reply.header(
      'Content-Disposition',
      'attachment; filename="orders.xlsx"',
    )

    return reply.send(stream)
  }

}
