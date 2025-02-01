import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(createProductDto: CreateProductDto) {
    const {
      productId,
      productName,
      productDescription,
      HSN,
      categoryId,
      subCategoryId,
    } = createProductDto;

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

  async getProducts() {
    return this.prisma.product.findMany({
      include: {
        category: true,
      },
    });
  }

  async getProductById(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    try {
      const {
        productId,
        productName,
        productDescription,
        HSN,
        categoryId,
        subCategoryId,
      } = updateProductDto;
  
      return await this.prisma.product.update({
        where: { id },
        data: {
          productId,
          productName,
          productDescription,
          HSN,
          categoryId,
          subCategoryId: subCategoryId ? Number(subCategoryId) : null,
        },
      });
    } catch (error) {
      console.error('Error updating product:', error);
      throw new Error(`Failed to update product: ${error.message}`);
    }
  }
  

  async deleteProduct(id: number) {
    return this.prisma.product.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
