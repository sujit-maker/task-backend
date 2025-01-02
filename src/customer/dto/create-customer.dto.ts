import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  customerId: string;

  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsString()
  registerAddress: string;

  @IsNotEmpty()
  @IsString()
  gstNo: string;

  @IsNotEmpty()
  @IsString()
  contactName: string;

  @IsNotEmpty()
  @IsString()
  contactNumber: string;

  @IsNotEmpty()
  @IsEmail()
  emailId: string;
}
