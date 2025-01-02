import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // Assuming Prisma is used
import { CreateSubCategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubCategoryDto } from './dto/update-subcategory.dto';

@Injectable()
export class SubcategeoryService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new subcategory
  async createSubCategory(createSubCategoryDto: CreateSubCategoryDto) {
    const { subCategoryName, categoryId } = createSubCategoryDto;
  
    return this.prisma.subCategory.create({
      data: {
        subCategoryName,
        category: {
          connect: { id: categoryId }, // Connect to existing category via categoryId
        },
      },
      include: {
        category: true,  // Include associated category in the response
      },
    });
  }
  
  // Get all subcategories with their associated category
  async getSubCategories() {
    return this.prisma.subCategory.findMany({
      include: {
        category: true, // Include associated category in the response
      },
    });
  }

  // Get a specific subcategory by its ID
  async getSubCategoryById(id: number) {
    const subCategory = await this.prisma.subCategory.findUnique({
      where: { id },
      include: {
        category: true, // Include associated category
      },
    });

    if (!subCategory) {
      throw new NotFoundException(`SubCategory with ID ${id} not found`);
    }

    return subCategory;
  }

  // Update a subcategory and its associated category
  async updateSubCategory(id: number, updateSubCategoryDto: UpdateSubCategoryDto) {
    const { subCategoryName, categoryId } = updateSubCategoryDto;
  
    return this.prisma.subCategory.update({
      where: { id },
      data: {
        subCategoryName,
        category: categoryId ? { connect: { id: categoryId } } : undefined, // Update the category if provided
      },
      include: {
        category: true, // Include the updated category
      },
    });
  }

  // Fetch subcategories by category ID
async getSubCategoriesByCategoryId(categoryId: number) {
  const subcategories = await this.prisma.subCategory.findMany({
    where: { categoryId }, // Filter by categoryId
    include: {
      category: true, // Include associated category details if needed
    },
  });

  if (!subcategories || subcategories.length === 0) {
    throw new NotFoundException(`No subcategories found for category ID ${categoryId}`);
  }

  return subcategories;
}

  
  // Delete a subcategory by its ID
  async deleteSubCategory(id: number) {
    try {
      return await this.prisma.subCategory.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`SubCategory with ID ${id} not found`);
      }
      throw new InternalServerErrorException('Failed to delete subcategory');
    }
  }
}
