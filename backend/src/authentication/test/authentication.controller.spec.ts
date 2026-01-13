import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationController } from '../controller/authentication.controller';
import { AUTHENTICATION_SERVICE } from '../auth.constants';
import { LoginDto } from '../schema/login.schema';

describe('AuthenticationController', () => {
  let controller: AuthenticationController;

  const authServiceMock = {
    login: jest.fn((dto: LoginDto) => {
      return { accessToken: 'mock-token' };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        {
          provide: AUTHENTICATION_SERVICE,
          useValue: authServiceMock,
        },
      ],
    }).compile();

    controller = module.get(AuthenticationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call login()', () => {
    controller.create({ email: 'a@test.com', password: '123' });

    expect(authServiceMock.login).toHaveBeenCalled();
  });
});
