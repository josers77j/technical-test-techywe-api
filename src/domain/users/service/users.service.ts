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
import { GenericQueryFilterDto } from 'src/dto/generic-query-filters.dto';
import {
  UpdateUserBasicInformationDto,
  UpdateUserPasswordDto,
} from '../dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

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

      return {
        message: 'User created successfully',
      };
    } catch (err) {
      Logger.error(err);
      if (err instanceof UnprocessableEntityException) throw err;
      throw new InternalServerErrorException(
        'ups... There was an error on the server side.',
      );
    }
  }

  async findAll<T>(queryFilter: GenericQueryFilterDto<T>) {
    try {
      return await this.usersRepository.findAll(queryFilter);
    } catch (err) {
      Logger.error(err);
      if (err instanceof UnprocessableEntityException) throw err;
      throw new InternalServerErrorException(
        'ups... There was an error on the server side.',
      );
    }
  }

  async updateBasicInformation(
    id: number,
    user: UpdateUserBasicInformationDto,
  ) {
    try {
      const userupdated = await this.usersRepository.updateBasicInformation(
        id,
        user,
      );
      if (!userupdated)
        throw new UnprocessableEntityException(
          'There was an error updating the user information',
        );
      return { message: 'User information updated successfully' };
    } catch (err) {
      Logger.error(err);
      if (err instanceof UnprocessableEntityException) throw err;
      throw new InternalServerErrorException(
        'ups... There was an error on the server side.',
      );
    }
  }

  async updatePassword(id: number, { password }: UpdateUserPasswordDto) {
    try {
      const userupdated = await this.usersRepository.updatePassword(id, {
        password: await bcrypt.hash(password, 10),
      });
      if (!userupdated)
        throw new UnprocessableEntityException(
          'There was an error updating the user password',
        );
      return { message: 'User password updated successfully' };
    } catch (err) {
      Logger.error(err);
      if (err instanceof UnprocessableEntityException) throw err;
      throw new InternalServerErrorException(
        'ups... There was an error on the server side.',
      );
    }
  }

  async remove(id: number) {
    try {
      const userDeleted = await this.usersRepository.remove(id);
      if (!userDeleted)
        throw new UnprocessableEntityException(
          'There was an error deleting the user',
        );
      return { message: 'User deleted successfully' };
    } catch (err) {
      Logger.error(err);
      if (err instanceof UnprocessableEntityException) throw err;
      throw new InternalServerErrorException(
        'ups... There was an error on the server side.',
      );
    }
  }
}
