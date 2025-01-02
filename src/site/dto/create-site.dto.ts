import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateSiteDto {
  @IsNotEmpty()
  @IsString()
  siteId: string;

  @IsNotEmpty()
  @IsString()
  siteName: string;

  @IsNotEmpty()
  @IsString()
  contactNumber: string;

  @IsNotEmpty()
  @IsEmail()
  emailId: string;

  @IsNotEmpty()
  customerId: number; 
}
