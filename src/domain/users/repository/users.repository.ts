import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { builderPagination } from 'src/utils/pagination-builder.helpers';
import { Prisma, User } from '@prisma/client';
import { GenericQueryFilterDto } from 'src/dto/generic-query-filters.dto';
import {
  UpdateUserBasicInformationDto,
  UpdateUserPasswordDto,
} from '../dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneByUserEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  create(user: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: user,
    });
  }

  findAll<T>(queryFilter: GenericQueryFilterDto<T>) {
    const { page, perPage } = queryFilter;
    const where: Prisma.UserWhereInput = {};

    return builderPagination({
      model: this.prisma.user,
      args: { where },
      options: {
        page,
        perPage,
      },
    });
  }

  updateBasicInformation(id: number, user: UpdateUserBasicInformationDto) {
    const { name, lastname, email } = user;
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        lastname,
        email,
      },
    });
  }

  updatePassword(id: number, user: UpdateUserPasswordDto) {
    const { password } = user;
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
  }

  async delete(id: number) {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
