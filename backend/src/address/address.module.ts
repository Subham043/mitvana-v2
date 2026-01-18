import { Module } from '@nestjs/common';
import { AddressController } from './controller/address.controller';
import { ADDRESS_REPOSITORY, ADDRESS_SERVICE } from './address.constants';
import { IAddressService } from './service/address.service';
import { IAddressRepository } from './repository/address.repository';

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
  ],
})
export class AddressModule { }
