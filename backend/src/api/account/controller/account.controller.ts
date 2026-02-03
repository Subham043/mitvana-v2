import { Controller, Body, Inject, Get, UseGuards, Put, Res } from '@nestjs/common';
import { VineValidationPipe } from 'src/utils/validator/pipe/vine_validation.pipe';
import { Throttle } from '@nestjs/throttler';
import { ACCOUNT_SERVICE } from '../account.constants';
import { AccountServiceInterface } from '../interface/account.service.interface';
import { ProfileDto, profileDtoValidator } from '../schema/profile.schema';
import { GetCurrentUser } from 'src/auth/decorators/get_current_user.decorator';
import { JwtPayload, JwtRefreshPayload } from 'src/auth/auth.types';
import { AccessTokenGuard } from 'src/auth/guards/jwt-auth.guard';
import { Verified } from 'src/auth/decorators/verified.decorator';
import { VerifiedGuard } from 'src/auth/guards/verified.guard';
import { UpdatePasswordDto, updatePasswordDtoValidator } from '../schema/update_password.schema';
import { VerifyProfileDto, verifyProfileDtoValidator } from '../schema/verify_profile.schema';
import { RefreshTokenGuard } from 'src/auth/guards/refresh_token.guard';
import { GetCurrentUserAndRefreshToken } from 'src/auth/decorators/get_current_user_with_refresh_token.decorator';
import { ConfigService } from '@nestjs/config';
import { FastifyReply } from 'fastify';
import { HelperUtil } from 'src/utils/helper.util';

@Controller({
  version: '1',
  path: 'profile',
})
export class AccountController {
  constructor(
    @Inject(ACCOUNT_SERVICE) private readonly accountService: AccountServiceInterface,
    private readonly configService: ConfigService
  ) { }

  @Get('/')
  @UseGuards(AccessTokenGuard)
  getProfile(@GetCurrentUser() user: JwtPayload) {
    return user;
  }

  @Put('/')
  @Verified()
  @UseGuards(AccessTokenGuard, VerifiedGuard)
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  async updateProfile(@Body(new VineValidationPipe(profileDtoValidator)) profileDto: ProfileDto, @GetCurrentUser() user: JwtPayload) {
    return await this.accountService.updateProfile(user.id, profileDto);
  }

  @Put('/update-password')
  @Verified()
  @UseGuards(AccessTokenGuard, VerifiedGuard)
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  async updatePassword(@Body(new VineValidationPipe(updatePasswordDtoValidator)) updatePasswordDto: UpdatePasswordDto, @GetCurrentUser() user: JwtPayload) {
    await this.accountService.updatePassword(user.id, updatePasswordDto);
    return {
      message: 'Password updated successfully',
    };
  }

  @Put('/verify')
  @UseGuards(AccessTokenGuard)
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  async verifyProfile(@Body(new VineValidationPipe(verifyProfileDtoValidator)) verifyProfileDto: VerifyProfileDto, @GetCurrentUser() user: JwtPayload) {
    await this.accountService.verifyProfile(user.id, verifyProfileDto);
    return {
      message: 'Profile verified successfully',
    };
  }

  @Get('/resend-verification-code')
  @UseGuards(AccessTokenGuard)
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  async resendVerificationCode(@GetCurrentUser() user: JwtPayload) {
    await this.accountService.resendVerificationCode(user.id);
    return {
      message: 'Verification code sent successfully',
    };
  }

  @Get('/refresh')
  @UseGuards(RefreshTokenGuard)
  async refreshToken(@GetCurrentUserAndRefreshToken() user: JwtRefreshPayload) {
    return await this.accountService.regenerateAccessToken(user);
  }

  @Get('/logout')
  @UseGuards(AccessTokenGuard)
  async logout(@GetCurrentUser() user: JwtPayload, @Res({ passthrough: true }) res: FastifyReply) {
    HelperUtil.removeCookie(res, this.configService);
    return {
      message: 'Logout successfully',
    };
  }
}
