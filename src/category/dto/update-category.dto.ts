import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class UpdateCategoryDto {
  @IsNotEmpty()
  @IsString()
  categoryName: string;

  @IsOptional()
  subCategories?: { subCategoryName: string }[]; // Ensure this matches your Prisma relation structure
}
