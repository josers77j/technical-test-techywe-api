import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/domain/users/dto/create-user.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService, // Inyectamos el mock del servicio
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should call AuthService.login and return a token', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: '123456',
      };
      const mockToken = { token: 'mockToken' };

      jest.spyOn(authService, 'login').mockResolvedValue(mockToken);

      const result = await controller.login(loginDto);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(authService.login).toHaveBeenCalledWith(loginDto); // Verifica que el servicio fue llamado con los argumentos correctos
      expect(result).toEqual(mockToken); // Verifica que el resultado sea el esperado
    });
  });

  describe('register', () => {
    it('should call AuthService.register and return the created user', async () => {
      const registerDto: CreateUserDto = {
        name: 'John',
        lastname: 'Doe',
        email: 'test@example.com',
        password: '123456',
      };
      const mockUser = { name: 'John', email: 'test@example.com' };

      jest.spyOn(authService, 'register').mockResolvedValue(mockUser);

      const result = await controller.register(registerDto);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(authService.register).toHaveBeenCalledWith(registerDto); // Verifica que el servicio fue llamado con los argumentos correctos
      expect(result).toEqual(mockUser); // Verifica que el resultado sea el esperado
    });
  });
});
