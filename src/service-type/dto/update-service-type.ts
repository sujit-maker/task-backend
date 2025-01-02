import { IsNotEmpty, IsString } from "class-validator";

export class UpdateServiceTypeDto{
    @IsNotEmpty()
      @IsString()
    serviceType: string;
}