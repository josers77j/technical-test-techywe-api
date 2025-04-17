import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.product.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async create(userId: number, product: CreateProductDto) {
    const { name, description, price, categoryId } = product;
    return await this.prisma.product.create({
      data: {
        name,
        description,
        price,
        userId,
        categoryId,
      },
    });
  }

  async update(userId: number, productId: number, product: UpdateProductDto) {
    const { name, description, price, categoryId } = product;
    return await this.prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        description,
        price,
        userId,
        categoryId,
      },
    });
  }

  async delete(productId: number) {
    return await this.prisma.product.delete({
      where: {
        id: productId,
      },
    });
  }
}
