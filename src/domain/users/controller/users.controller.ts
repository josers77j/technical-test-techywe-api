import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { AuthGuard } from 'src/domain/auth/guards/auth.guard';
import { GenericQueryFilterDto } from 'src/dto/generic-query-filters.dto';
import {
  UpdateUserBasicInformationDto,
  UpdateUserPasswordDto,
} from '../dto/update-user.dto';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll<T>(@Query() queryFilter: GenericQueryFilterDto<T>) {
    return this.usersService.findAll(queryFilter);
  }

  @Patch('/:id')
  updateBasicInformation(
    @Param('id') id: number,
    @Body() user: UpdateUserBasicInformationDto,
  ) {
    return this.usersService.updateBasicInformation(+id, user);
  }

  @Patch('/password/:id')
  updatePassword(@Param('id') id: number, @Body() user: UpdateUserPasswordDto) {
    return this.usersService.updatePassword(+id, user);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.delete(+id);
  }
}
