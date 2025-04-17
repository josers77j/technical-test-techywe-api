import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { GenericQueryFilterDto } from 'src/dto/generic-query-filters.dto';
import { builderPagination } from 'src/utils/pagination-builder.helpers';
import { CreateCategoryDto } from '../dto/create-category.dto';

import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll<T>(queryFilter: GenericQueryFilterDto<T>) {
    const { page, perPage } = queryFilter;
    const where: Prisma.CategoryWhereInput = {};
    return await builderPagination({
      model: this.prisma.category,
      args: { where },
      options: {
        page,
        perPage,
      },
    });
  }

  async create(category: CreateCategoryDto): Promise<Category> {
    const { name } = category;
    return await this.prisma.category.create({
      data: {
        name,
      },
    });
  }

  async update(id: number, category: UpdateCategoryDto) {
    const { name } = category;
    return await this.prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }

  async delete(id: number) {
    return await this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
