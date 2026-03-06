import { Module } from '@nestjs/common';
import { AddressController } from './controller/address.controller';
import { ADDRESS_REPOSITORY, ADDRESS_SERVICE } from './address.constants';
import { IAddressService } from './service/address.service';
import { IAddressRepository } from './repository/address.repository';
import { PINCODE_REPOSITORY } from '../pincodes/pincode.constants';
import { IPincodeRepository } from '../pincodes/repository/pincode.repository';

@Module({
  imports: [],
  controllers: [AddressController],
  providers: [
    {
      provide: ADDRESS_SERVICE,
      useClass: IAddressService,
    },
    {
      provide: ADDRESS_REPOSITORY,
      useClass: IAddressRepository,
    },
    {
      provide: PINCODE_REPOSITORY,
      useClass: IPincodeRepository,
    },
  ],
})
export class AddressModule { }
