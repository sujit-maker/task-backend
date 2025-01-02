import { IsNotEmpty, IsString, IsEmail, IsInt, isInt, IsIn, IsPositive } from 'class-validator';

export class UpdateTaskDto {
  @IsNotEmpty()
  @IsInt()
  taskTypeId: number;

  @IsNotEmpty()
  @IsInt()
  departmentId: number;

  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsEmail()
  customerAddress: string;

  @IsNotEmpty()
  @IsString()
  gstNo: string; 

  @IsNotEmpty()
  @IsString()
  contactName: string;
  
 @IsNotEmpty()
   @IsPositive() 
   contactNo: string;

  @IsNotEmpty()
  @IsString()
  emailId: string; 

  @IsNotEmpty()
  @IsString()
  requirement: string; 
}