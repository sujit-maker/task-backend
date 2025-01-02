import { IsInt, IsNotEmpty,IsString } from "class-validator";

export class UpdateTaskTypeDto {
    @IsString()
    @IsNotEmpty()
    taskType: string;

    @IsInt()
    @IsNotEmpty()
    departmentId:number;
  }