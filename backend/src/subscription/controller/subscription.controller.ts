import { Controller, Post, Body, Inject, Delete, Param, Get, Put, UseGuards, Query } from '@nestjs/common';
import { SubscriptionDto, subscriptionDtoValidator } from '../schema/subscription.schema';
import { SubscriptionServiceInterface } from '../interface/subscription.service.interface';
import { SUBSCRIPTION_SERVICE } from '../subscription.constants';
import { VineValidationPipe } from 'src/utils/validator/pipe/vine_validation.pipe';
import { AccessTokenGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/auth/decorators/role.decorator';
import { Public } from 'src/auth/decorators/public.decorator';
import { PaginationDto, paginationDtoValidator } from 'src/utils/pagination/schema/pagination.schema';

@Controller({
  version: '1',
  path: 'subscription',
})
@UseGuards(AccessTokenGuard)
@Role("ADMIN")
export class SubscriptionController {
  constructor(@Inject(SUBSCRIPTION_SERVICE) private readonly subscriptionService: SubscriptionServiceInterface) { }

  @Post('/')
  @Public()
  createSubscription(@Body(new VineValidationPipe(subscriptionDtoValidator)) subscriptionDto: SubscriptionDto) {
    return this.subscriptionService.createSubscription(subscriptionDto);
  }

  @Put('/:id')
  updateSubscription(@Body(new VineValidationPipe(subscriptionDtoValidator)) subscriptionDto: SubscriptionDto, @Param('id') id: string) {
    return this.subscriptionService.updateSubscription(id, subscriptionDto);
  }

  @Delete('/:id')
  deleteSubscription(@Param('id') id: string) {
    return this.subscriptionService.deleteSubscription(id);
  }

  @Get('/:id')
  @Public()
  getSubscription(@Param('id') id: string) {
    return this.subscriptionService.getById(id);
  }

  @Get('/')
  @Public()
  getAllSubscriptions(@Query(new VineValidationPipe(paginationDtoValidator)) query: PaginationDto) {
    return this.subscriptionService.getAll(query);
  }
}
