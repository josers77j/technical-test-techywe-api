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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Users') // Group endpoints under the "Users" tag in Swagger
@ApiBearerAuth() // Indicate that these endpoints require JWT authentication
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users retrieved successfully.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  findAll<T>(@Query() queryFilter: GenericQueryFilterDto<T>) {
    return this.usersService.findAll(queryFilter);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update user basic information' })
  @ApiResponse({
    status: 200,
    description: 'User information updated successfully.',
  })
  @ApiResponse({ status: 422, description: 'Error updating user information.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  updateBasicInformation(
    @Param('id') id: number,
    @Body() user: UpdateUserBasicInformationDto,
  ) {
    return this.usersService.updateBasicInformation(+id, user);
  }

  @Patch('/password/:id')
  @ApiOperation({ summary: 'Update user password' })
  @ApiResponse({
    status: 200,
    description: 'User password updated successfully.',
  })
  @ApiResponse({ status: 422, description: 'Error updating user password.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  updatePassword(@Param('id') id: number, @Body() user: UpdateUserPasswordDto) {
    return this.usersService.updatePassword(+id, user);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  @ApiResponse({ status: 422, description: 'Error deleting the user.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  deleteUser(@Param('id') id: number) {
    return this.usersService.delete(+id);
  }
}
