import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateSiteDto {
  @IsOptional()
  @IsString()
  siteName?: string;

  @IsOptional()
  @IsString()
  contactNumber?: string;

  @IsOptional()
  @IsEmail()
  emailId?: string;

  @IsOptional()
  customerId?: number; 
}
