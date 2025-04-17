import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password for the user',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
