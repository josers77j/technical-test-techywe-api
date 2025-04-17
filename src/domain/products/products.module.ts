import { forwardRef, Module } from '@nestjs/common';
import { ProductsController } from './controller/products.controller';
import { ProductsService } from './service/products.service';
import { PrismaService } from 'prisma/prisma.service';
import { ProductsRepository } from './repository/products.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, ProductsRepository],
  imports: [forwardRef(() => AuthModule)],
})
export class ProductsModule {}
