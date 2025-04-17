import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { UsersService } from 'src/domain/users/service/users.service';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/domain/users/dto/create-user.dto';
import { Register } from '../interfaces/register.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findOneByUserEmail(email);

    const {
      password: passwordFromDb,
      email: emailFromDb,
      name,
      lastname,
    } = user;

    const isPasswordValid =
      passwordFromDb && (await bcrypt.compare(password, passwordFromDb));

    if (!user || !isPasswordValid) {
      throw new UnauthorizedException(
        'usuario u contraseña invalidos, intente de nuevo.',
      );
    }

    const payload = { emailFromDb, name, lastname };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
    };
  }

  async register({
    name,
    email,
    password,
    lastname,
  }: CreateUserDto): Promise<Register> {
    await this.userService.create({
      name,
      lastname,
      email,
      password: await bcrypt.hash(password, 10),
    });

    return {
      name,
      email,
    };
  }
}
