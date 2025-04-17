import { forwardRef, Module } from '@nestjs/common';
import { CategoriesController } from './controller/categories.controller';
import { PrismaService } from 'prisma/prisma.service';
import { CategoriesService } from './services/categories.service';
import { CategoriesRepository } from './repository/categories.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService, CategoriesRepository],
  imports: [forwardRef(() => AuthModule)],
})
export class CategoriesModule {}
