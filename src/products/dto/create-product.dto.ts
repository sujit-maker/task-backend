import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  productId: string;

  @IsString()
  productName: string;

  @IsString()
  productDescription: string;

  @IsString()
  HSN: string;

  @IsInt()
  categoryId: number;

  @IsString()
  subCategoryId: number;
}
