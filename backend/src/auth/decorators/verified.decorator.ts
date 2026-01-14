import { SetMetadata } from '@nestjs/common';

export const IS_VERIFIED_KEY = 'isVerified';

export const Verified = () => SetMetadata(IS_VERIFIED_KEY, true);