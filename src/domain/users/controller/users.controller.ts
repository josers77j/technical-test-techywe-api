import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { AuthGuard } from 'src/domain/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /* @Get()
  async findAll() {
    return this.usersService.findAll();
  } */
}
