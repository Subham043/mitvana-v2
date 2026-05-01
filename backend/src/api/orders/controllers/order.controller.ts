import { Controller, Inject, Get, UseGuards, Query, Param, Patch, Body, Res, BadRequestException, NotFoundException, Post } from '@nestjs/common';
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
import { GetCurrentUser } from 'src/auth/decorators/get_current_user.decorator';
import { JwtPayload } from 'src/auth/auth.types';
import { OrderCancelDto, orderCancelDtoValidator } from '../schema/order-cancel.schema';
import { PlaceOrderDto, placeOrderDtoValidator } from '../schema/place-order.schema';
import { VerifyOrderDto, verifyOrderDtoValidator } from '../schema/verify-order.schema';

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

  @Role("USER")
  @Get('/user')
  async getAllOrdersByUserId(@Query(new VineValidationPipe(orderFilterDtoValidator)) query: OrderFilterDto, @GetCurrentUser() user: JwtPayload) {
    return await this.orderService.getAllByUserId(user.id, query);
  }

  @Get('/:id')
  async getOrder(@Param('id') id: string) {
    return await this.orderService.getById(id);
  }

  @Role("USER")
  @Get('/user/:id')
  async getOrderByIdAndUserId(@Param('id') id: string, @GetCurrentUser() user: JwtPayload) {
    return await this.orderService.getByIdAndUserId(id, user.id);
  }

  @Patch('/status/:id')
  async updateOrderStatus(@Body(new VineValidationPipe(orderUpdateStatusDtoValidator)) orderUpdateStatusDto: OrderUpdateStatusDto, @Param('id') id: string) {
    return await this.orderService.updateOrderStatus(id, orderUpdateStatusDto);
  }

  @Role("USER")
  @Patch('/cancel/:id')
  async cancelOrder(@Body(new VineValidationPipe(orderCancelDtoValidator)) orderCancelDto: OrderCancelDto, @Param('id') id: string, @GetCurrentUser() user: JwtPayload) {
    return await this.orderService.cancelOrder(id, user.id, orderCancelDto);
  }

  @Role("USER")
  @Post('/place')
  async placeOrder(@Body(new VineValidationPipe(placeOrderDtoValidator)) placeOrderDto: PlaceOrderDto, @GetCurrentUser() user: JwtPayload) {
    return await this.orderService.placeOrder(user.id, placeOrderDto);
  }

  @Role("USER")
  @Post('/verify')
  async verifyPayment(@Body(new VineValidationPipe(verifyOrderDtoValidator)) verifyOrderDto: VerifyOrderDto) {
    return await this.orderService.verifyPayment(verifyOrderDto);
  }

  @Role("USER")
  @Get('/pdf/:id')
  async pdf(@Param('id') id: string, @Res() reply: FastifyReply, @GetCurrentUser() user: JwtPayload) {
    const order = await this.orderService.getById(id);

    if (order.user_id !== user.id && !user.is_admin) throw new NotFoundException('Order not found');

    if (order.status === 'Order Created' || order.status === 'Payment Failed' || order.status === 'Cancelled by Admin' || order.status === 'Cancelled By user' || order.status === 'Refunded' || order.status === 'Failed') {
      throw new BadRequestException('Order cannot be downloaded');
    }

    if (order.razorpay_payment?.status !== 'Success') {
      throw new BadRequestException('Order is not paid');
    }

    if (!order.order_address) {
      throw new BadRequestException('Order address not found');
    }

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
      'attachment; filename="invoice_' + order.orderId + '.pdf"',
    )

    return reply.send(buffer)
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
