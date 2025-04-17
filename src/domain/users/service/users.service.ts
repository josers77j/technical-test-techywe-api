import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersRepository } from '../repository/users.repository';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findOneByUserEmail(email: string) {
    try {
      const process = await this.usersRepository.findOneByUserEmail(email);
      if (!process)
        throw new UnauthorizedException(
          'Invalid username or password, please try again',
        );
      return process;
    } catch (err) {
      Logger.error(err);
      if (err instanceof UnauthorizedException) throw err;
      throw new InternalServerErrorException(
        'ups... There was an error on the server side',
      );
    }
  }

  async create(user: CreateUserDto) {
    const { email } = user;
    try {
      const emailValidated =
        await this.usersRepository.findOneByUserEmail(email);

      if (emailValidated) {
        throw new BadRequestException('Email already exists');
      }

      const userCreated = await this.usersRepository.create(user);

      if (!userCreated)
        throw new UnprocessableEntityException(
          'There was an error creating the user',
        );

      return userCreated;
    } catch (err) {
      Logger.error(err);
      if (err instanceof UnprocessableEntityException) throw err;
      throw new InternalServerErrorException(
        'ups... There was an error on the server side.',
      );
    }
  }
}
