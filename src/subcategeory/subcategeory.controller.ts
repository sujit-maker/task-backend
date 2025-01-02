import { Controller, Get, Post, Put, Delete, Body, Param, BadRequestException } from '@nestjs/common';
import { SubcategeoryService} from './subcategeory.service';  
import { CreateSubCategoryDto } from './dto/create-subcategory.dto'; 
import { UpdateSubCategoryDto } from './dto/update-subcategory.dto';

@Controller('subcategory')  
export class SubcategeoryController {
  constructor(private readonly subCategoryService: SubcategeoryService) {}

  @Post()
  create(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    return this.subCategoryService.createSubCategory(createSubCategoryDto);
  }

  @Get('/:categoryId')
  getSubCategories(@Param('categoryId') categoryId: string) {
    const numericId = parseInt(categoryId, 10);
    if (isNaN(numericId)) {
      throw new BadRequestException('Invalid Category ID');
    }
    return this.subCategoryService.getSubCategoriesByCategoryId(numericId);
  }

  @Get()
  findAll() {
    return this.subCategoryService.getSubCategories();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new BadRequestException('Invalid ID');
    }
    return this.subCategoryService.getSubCategoryById(numericId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSubCategoryDto: UpdateSubCategoryDto) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new BadRequestException('Invalid ID');
    }
    return this.subCategoryService.updateSubCategory(numericId, updateSubCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new BadRequestException('Invalid ID');
    }
    return this.subCategoryService.deleteSubCategory(numericId);
  }
}
