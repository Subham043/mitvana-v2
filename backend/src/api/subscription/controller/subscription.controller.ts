import { Controller, Post, Body, Inject, Delete, Param, Get, Put, UseGuards, Query } from '@nestjs/common';
import { SubscriptionDto, subscriptionDtoValidator } from '../schema/subscription.schema';
import { SubscriptionServiceInterface } from '../interface/subscription.service.interface';
import { SUBSCRIPTION_SERVICE } from '../subscription.constants';
import { VineValidationPipe } from 'src/utils/validator/pipe/vine_validation.pipe';
import { Role } from 'src/auth/decorators/role.decorator';
import { Public } from 'src/auth/decorators/public.decorator';
import { PaginationDto, paginationDtoValidator } from 'src/utils/pagination/schema/pagination.schema';
import { Verified } from 'src/auth/decorators/verified.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { VerifiedGuard } from 'src/auth/guards/verified.guard';
import { AccessTokenGuard } from 'src/auth/guards/access_token.guard';
import { BlockedGuard } from 'src/auth/guards/blocked.guard';

@Controller({
  version: '1',
  path: 'subscription',
})
@Verified()
@Role("ADMIN")
@UseGuards(AccessTokenGuard, BlockedGuard, VerifiedGuard, RolesGuard)
export class SubscriptionController {
  constructor(@Inject(SUBSCRIPTION_SERVICE) private readonly subscriptionService: SubscriptionServiceInterface) { }

  @Post('/')
  @Public()
  async createSubscription(@Body(new VineValidationPipe(subscriptionDtoValidator)) subscriptionDto: SubscriptionDto) {
    return await this.subscriptionService.createSubscription(subscriptionDto);
  }

  @Put('/:id')
  async updateSubscription(@Body(new VineValidationPipe(subscriptionDtoValidator)) subscriptionDto: SubscriptionDto, @Param('id') id: string) {
    return await this.subscriptionService.updateSubscription(id, subscriptionDto);
  }

  @Delete('/:id')
  async deleteSubscription(@Param('id') id: string) {
    return await this.subscriptionService.deleteSubscription(id);
  }

  @Get('/:id')
  async getSubscription(@Param('id') id: string) {
    return await this.subscriptionService.getById(id);
  }

  @Get('/')
  async getAllSubscriptions(@Query(new VineValidationPipe(paginationDtoValidator)) query: PaginationDto) {
    return await this.subscriptionService.getAll(query);
  }
}
