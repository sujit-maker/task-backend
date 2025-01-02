import { IsNotEmpty, IsString,IsInt } from 'class-validator';

export class UpdateTaskDto {
  @IsNotEmpty()
  @IsInt()
  serviceId: number;

  @IsNotEmpty()
  @IsInt()
  departmentId: number;

  @IsNotEmpty()
  @IsInt()
  customerId: number;

  @IsNotEmpty()
  @IsInt()
  siteId: number;

  @IsNotEmpty()
  @IsString()
  workScope: string; 

  @IsNotEmpty()
  @IsString()
  proposedDate: string;
  
  @IsNotEmpty()
  @IsString() 
  priority : string;

  @IsNotEmpty()
  @IsString()
  remark: string; 

  @IsNotEmpty()
  @IsString()
  status: string; 
}
