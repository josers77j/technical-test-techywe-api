import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoriesService } from '../services/categories.service';
import { GenericQueryFilterDto } from 'src/dto/generic-query-filters.dto';
import { AuthGuard } from 'src/domain/auth/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@UseGuards(AuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll<T>(@Query() queryFilter: GenericQueryFilterDto<T>) {
    return this.categoriesService.findAll(queryFilter);
  }

  @Patch('/:id')
  update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.categoriesService.remove(+id);
  }
}
