import { IsInt, IsNotEmpty,IsString } from "class-validator";

export class CreateTaskTypeDto {
    @IsString()
    @IsNotEmpty()
    taskType: string;

    @IsInt()
    @IsNotEmpty()
    departmentId: number;
  }