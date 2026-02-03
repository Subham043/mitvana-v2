import { Controller, Post, Body, Inject, Get, UseGuards } from '@nestjs/common';
import { SettingDto, settingDtoValidator } from '../schema/setting.schema';
import { SettingServiceInterface } from '../interface/setting.service.interface';
import { SETTING_SERVICE } from '../setting.constants';
import { VineValidationPipe } from 'src/utils/validator/pipe/vine_validation.pipe';
import { AccessTokenGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/auth/decorators/role.decorator';
import { Public } from 'src/auth/decorators/public.decorator';
import { Verified } from 'src/auth/decorators/verified.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { VerifiedGuard } from 'src/auth/guards/verified.guard';

@Controller({
  version: '1',
  path: 'setting',
})
@Verified()
@Role("ADMIN")
@UseGuards(AccessTokenGuard, VerifiedGuard, RolesGuard)
export class SettingController {
  constructor(@Inject(SETTING_SERVICE) private readonly settingService: SettingServiceInterface) { }

  @Post('/')
  async save(@Body(new VineValidationPipe(settingDtoValidator)) settingDto: SettingDto) {
    return await this.settingService.set(settingDto);
  }

  @Get('/')
  @Public()
  async get() {
    return await this.settingService.get();
  }
}
