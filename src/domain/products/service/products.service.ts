import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductsRepository } from '../repository/products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  async create(userId: number, product: CreateProductDto) {
    try {
      const productCreated = await this.productsRepository.create(
        userId,
        product,
      );

      if (!productCreated)
        throw new UnprocessableEntityException(
          'There was an error creating the product',
        );

      return { message: 'Product created successfully' };
    } catch (err) {
      Logger.error(err);
      if (err instanceof UnprocessableEntityException) throw err;

      throw new InternalServerErrorException(
        'There was an error creating the product',
      );
    }
  }

  async findAll() {
    try {
      return await this.productsRepository.findAll();
    } catch (err) {
      Logger.error(err);
      throw new InternalServerErrorException(
        'There was an error retrieving the products',
      );
    }
  }

  async update(
    userId: number,
    productId: number,
    updateProductDto: UpdateProductDto,
  ) {
    try {
      const productUpdated = await this.productsRepository.update(
        userId,
        productId,
        updateProductDto,
      );

      if (!productUpdated)
        throw new UnprocessableEntityException(
          'There was an error updating the product',
        );

      return { message: 'Product updated successfully' };
    } catch (err) {
      Logger.error(err);
      if (err instanceof UnprocessableEntityException) throw err;

      throw new InternalServerErrorException(
        'There was an error updating the product',
      );
    }
  }

  async remove(id: number) {
    try {
      const productDeleted = await this.productsRepository.delete(id);

      if (!productDeleted)
        throw new UnprocessableEntityException(
          'There was an error deleting the product',
        );

      return { message: 'Product deleted successfully' };
    } catch (err) {
      Logger.error(err);
      if (err instanceof UnprocessableEntityException) throw err;

      throw new InternalServerErrorException(
        'There was an error deleting the product',
      );
    }
  }
}
