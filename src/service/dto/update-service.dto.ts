import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateServiceDto {
  @IsNotEmpty()
  @IsString()
  serviceName: string;

  @IsNotEmpty()
  @IsString()
  serviceDescription: string;

  @IsNotEmpty()
  @IsString()
  SAC: string;

  @IsNotEmpty()
  departmentId: number;

   @IsNotEmpty()
    @IsInt()
    categoryId:number;
  
    @IsNotEmpty()
    @IsInt()
    subCategoryId : number;
}
