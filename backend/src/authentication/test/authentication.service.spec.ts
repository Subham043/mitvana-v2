import { Test, TestingModule } from '@nestjs/testing';
import { IAuthenticationService } from '../service/authentication.service';
import { AuthenticationServiceInterface } from '../interface/authentication.service.interface';

describe('AuthenticationService', () => {
  let service: AuthenticationServiceInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IAuthenticationService],
    }).compile();

    service = module.get<AuthenticationServiceInterface>(IAuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
