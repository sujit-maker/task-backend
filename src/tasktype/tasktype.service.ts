import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskTypeDto } from './dto/create-tasktype.dto';
import { UpdateTaskTypeDto } from './dto/update-tasktype.dto';

@Injectable()
export class TasktypeService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new task type
  async create(createTaskTypeDto: CreateTaskTypeDto) {
    const { taskType, departmentId } = createTaskTypeDto;

    // Create a new task type, associating it with a department
    const taskTypeEntity = await this.prisma.taskType.create({
      data: {
        taskType,
        departmentId, 
      },
    });

    return taskTypeEntity;
  }

  // Get all task types
  async findAll() {
    return this.prisma.taskType.findMany();
  }

  // Get a task type by ID
  async findOne(id: number) {
    const taskType = await this.prisma.taskType.findUnique({
      where: { id },
    });

    if (!taskType) {
      throw new NotFoundException(`TaskType with ID ${id} not found`);
    }

    return taskType;
  }

  // Update a task type by ID
  async update(id: number, UpdateTaskTypeDto: UpdateTaskTypeDto) {
    const { taskType, departmentId } = UpdateTaskTypeDto;

    // Ensure the task type exists before updating
    const existingTaskType = await this.prisma.taskType.findUnique({
      where: { id },
    });

    if (!existingTaskType) {
      throw new NotFoundException(`TaskType with ID ${id} not found`);
    }

    return this.prisma.taskType.update({
      where: { id },
      data: {
        taskType,
        departmentId, // Update the department association as well
      },
    });
  }

  // Delete a task type by ID
  async remove(id: number) {
    // Ensure the task type exists before deleting
    const taskType = await this.prisma.taskType.findUnique({
      where: { id },
    });

    if (!taskType) {
      throw new NotFoundException(`TaskType with ID ${id} not found`);
    }

    return this.prisma.taskType.delete({
      where: { id },
    });
  }
}
