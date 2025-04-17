import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductsService } from '../service/products.service';
import { UpdateProductDto } from '../dto/update-product.dto';
import { AuthGuard } from 'src/domain/auth/guards/auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Products') // Group endpoints under the "Products" tag in Swagger
@ApiBearerAuth() // Indicate that these endpoints require JWT authentication
@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully.' })
  @ApiResponse({ status: 422, description: 'Error creating the product.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  create(@Request() req: Request, @Body() product: CreateProductDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = req['user'];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const userId = user['id'];
    return this.productsService.create(+userId, product);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all products' })
  @ApiResponse({
    status: 200,
    description: 'List of products retrieved successfully.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  findAll() {
    return this.productsService.findAll();
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'Product updated successfully.' })
  @ApiResponse({ status: 422, description: 'Error updating the product.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  update(
    @Param('id') productId: string,
    @Body() updateProductDto: UpdateProductDto,
    @Request() req: Request,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = req['user'];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const userId = user['id'];
    return this.productsService.update(+userId, +productId, updateProductDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully.' })
  @ApiResponse({ status: 422, description: 'Error deleting the product.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
