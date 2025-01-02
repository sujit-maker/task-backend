import { IsNotEmpty, IsString } from 'class-validator';

export class CreateServiceDto {
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
  serviceTypeId: number;
}
