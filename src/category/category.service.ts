import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new category with subcategories
  async createCategory(createCategoryDto: CreateCategoryDto) {
    const { categoryName, subCategoryName } = createCategoryDto;
  
    return this.prisma.category.create({
      data: {
        categoryName,
        subCategories: {
          create: [
            {
              subCategoryName, // Create subcategory with the provided name
            },
          ],
        },
      },
      include: {
        subCategories: true, // Include subcategories in the response
      },
    });
  }
  
  // Get all categories with subcategories
  async getCategories() {
    return this.prisma.category.findMany({
      include: {
        subCategories: true,
      },
    });
  }

  // Get a specific category by its ID
  async getCategoryById(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        subCategories: true,
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  // Update a category and its subcategories
  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    const { categoryName, subCategories } = updateCategoryDto;
  
    return this.prisma.category.update({
      where: { id },
      data: {
        categoryName,
        subCategories: {
          deleteMany: {}, 
          create: subCategories, 
        },
      },
      include: {
        subCategories: true,
      },
    });
  }
  
  // Delete a category by its ID
  async deleteCategory(id: number) {
    try {
      return await this.prisma.category.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      throw new InternalServerErrorException('Failed to delete category');
    }
  }
}
