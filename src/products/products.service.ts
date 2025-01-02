import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new product
  async createProduct(createProductDto: CreateProductDto) {
    const { productId, productName, productDescription, HSN, categoryId, subCategoryId } = createProductDto;
    
    return this.prisma.product.create({
      data: {
        productId,
        productName,
        productDescription,
        HSN,
        categoryId,
        subCategoryId,
      },
    });
  }

 // Get all products with their category information
async getProducts() {
  return this.prisma.product.findMany({
    include: {
      category: true,  // Corrected to 'category' (lowercase)
    },
  });
}

// Get a product by its ID
async getProductById(id: number) {
  return this.prisma.product.findUnique({
    where: { id },
    include: {
      category: true,  // Corrected to 'category' (lowercase)
    },
  });
}


  // Update a product by its ID
 // Update a product by its ID
async updateProduct(id: number, updateProductDto: UpdateProductDto) {
  const { productId, productName, productDescription, HSN, categoryId, subCategoryId } = updateProductDto;

  return this.prisma.product.update({
    where: { id },
    data: {
      productId,
      productName,
      productDescription,
      HSN,
      categoryId,
      subCategoryId: Number(subCategoryId), // Ensure it's passed as a number
    },
  });
}

  // Delete a product by its ID
 // Ensure that the id passed is a number
async deleteProduct(id: number) {
  return this.prisma.product.delete({
    where: {
      id: Number(id), // Convert the id to a number if it's a string
    },
  });
}

  
}
