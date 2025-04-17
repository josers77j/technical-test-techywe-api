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

@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Request() req: Request, @Body() product: CreateProductDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = req['user'];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const userId = user['id'];
    /* ? Maybe a better way to do this is using a @User decorator, but i dont have to much time to implement it */
    return this.productsService.create(+userId, product);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }
  @Patch('/:id')
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
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
