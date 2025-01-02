//src/users/dto/create-user.dto.ts
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  userType: string;

  @IsNotEmpty()
  contactNumber: string;

  @IsNotEmpty()
  emailId: string;


  @IsInt()
  @IsNotEmpty()
  departmentId: number;
}
