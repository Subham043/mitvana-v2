import { Controller, Inject, Get, UseGuards, Query, Param, Patch, Body, Res } from '@nestjs/common';
import { VineValidationPipe } from 'src/utils/validator/pipe/vine_validation.pipe';
import { Role } from 'src/auth/decorators/role.decorator';
import { Verified } from 'src/auth/decorators/verified.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { VerifiedGuard } from 'src/auth/guards/verified.guard';
import { AccessTokenGuard } from 'src/auth/guards/access_token.guard';
import { BlockedGuard } from 'src/auth/guards/blocked.guard';
import { PaymentFilterDto, paymentFilterDtoValidator } from '../schema/payment-filter.schema';
import { PAYMENT_SERVICE } from '../payment.constant';
import { PaymentServiceInterface } from '../interface/payment.service.interface';
import { FastifyReply } from 'fastify';

@Controller({
  version: '1',
  path: 'payment',
})
@Verified()
@Role("ADMIN")
@UseGuards(AccessTokenGuard, BlockedGuard, VerifiedGuard, RolesGuard)
export class PaymentController {
  constructor(@Inject(PAYMENT_SERVICE) private readonly paymentService: PaymentServiceInterface) { }

  @Get('/')
  async getAllPayments(@Query(new VineValidationPipe(paymentFilterDtoValidator)) query: PaymentFilterDto) {
    return await this.paymentService.getAll(query);
  }

  @Get('/export')
  async export(@Query(new VineValidationPipe(paymentFilterDtoValidator)) query: PaymentFilterDto, @Res() reply: FastifyReply) {
    const stream = await this.paymentService.exportPayments(query)

    reply.header(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )

    reply.header(
      'Content-Disposition',
      'attachment; filename="payments.xlsx"',
    )

    return reply.send(stream)
  }

}
