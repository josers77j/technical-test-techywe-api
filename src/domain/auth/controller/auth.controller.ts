import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { CreateUserDto } from 'src/domain/users/dto/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth') // Group endpoints under the "Auth" tag in Swagger
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Authenticate a user and return a JWT token' })
  @ApiResponse({ status: 200, description: 'User authenticated successfully.' })
  @ApiResponse({ status: 401, description: 'Invalid email or password.' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  register(@Body() registerDto: CreateUserDto) {
    return this.authService.register(registerDto);
  }
}
