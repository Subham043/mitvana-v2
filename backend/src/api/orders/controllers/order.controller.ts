import { Controller, Inject, Get, UseGuards, Query, Param } from '@nestjs/common';
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

@Controller({
  version: '1',
  path: 'order',
})
@Verified()
@Role("ADMIN")
@UseGuards(AccessTokenGuard, BlockedGuard, VerifiedGuard, RolesGuard)
export class OrderController {
  constructor(@Inject(ORDER_SERVICE) private readonly orderService: OrderServiceInterface) { }

  @Get('/')
  async getAllOrders(@Query(new VineValidationPipe(orderFilterDtoValidator)) query: OrderFilterDto) {
    return await this.orderService.getAll(query);
  }

  @Get('/:id')
  async getOrder(@Param('id') id: string) {
    return await this.orderService.getById(id);
  }

}
