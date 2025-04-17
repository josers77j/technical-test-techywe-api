import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserBasicInformationDto extends PickType(CreateUserDto, [
  'email',
  'name',
  'lastname',
] as const) {}

export class UpdateUserPasswordDto extends PickType(CreateUserDto, [
  'password',
] as const) {}
