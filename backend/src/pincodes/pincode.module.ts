import { Module } from '@nestjs/common';
import { PincodeController } from './controller/pincode.controller';
import { PINCODE_REPOSITORY, PINCODE_SERVICE } from './pincode.constants';
import { IPincodeService } from './service/pincode.service';
import { IPincodeRepository } from './repository/pincode.repository';

@Module({
  imports: [],
  controllers: [PincodeController],
  providers: [
    {
      provide: PINCODE_SERVICE,
      useClass: IPincodeService,
    },
    {
      provide: PINCODE_REPOSITORY,
      useClass: IPincodeRepository,
    },
  ],
})
export class PincodeModule { }
