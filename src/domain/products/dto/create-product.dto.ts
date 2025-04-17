import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Laptop', description: 'The name of the product' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'A high-performance laptop',
    description: 'A brief description of the product',
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ example: 1200.99, description: 'The price of the product' })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the category the product belongs to',
  })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
