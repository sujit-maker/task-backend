// create-subcategory.dto.ts
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateSubCategoryDto {
  @IsNotEmpty()
  @IsString()
  subCategoryName: string;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number; 
}
