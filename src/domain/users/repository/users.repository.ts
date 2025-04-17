import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

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

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
