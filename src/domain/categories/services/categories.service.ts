import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoriesRepository } from '../repository/categories.repository';
import { GenericQueryFilterDto } from 'src/dto/generic-query-filters.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async findAll<T>(queryFilter: GenericQueryFilterDto<T>) {
    try {
      return await this.categoriesRepository.findAll(queryFilter);
    } catch (err) {
      Logger.error(err);
      throw new InternalServerErrorException(
        'ups... There was an error on the server side',
      );
    }
  }

  async create(category: CreateCategoryDto) {
    try {
      const categoryCreated = await this.categoriesRepository.create(category);

      if (!categoryCreated)
        throw new InternalServerErrorException(
          'There was an error creating the category',
        );

      return { message: 'Category created successfully' };
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(
        'ups... There was an error on the server side',
      );
    }
  }

  async update(id: number, category: UpdateCategoryDto) {
    try {
      const categoryUpdated = await this.categoriesRepository.update(
        id,
        category,
      );

      if (!categoryUpdated)
        throw new InternalServerErrorException(
          'There was an error updating the category',
        );

      return { message: 'Category updated successfully' };
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(
        'ups... There was an error on the server side',
      );
    }
  }

  async remove(id: number) {
    try {
      const categoryDeleted = await this.categoriesRepository.delete(id);

      if (!categoryDeleted)
        throw new InternalServerErrorException(
          'There was an error deleting the category',
        );

      return { message: 'Category deleted successfully' };
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(
        'ups... There was an error on the server side',
      );
    }
  }
}
