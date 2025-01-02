import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Ensure correct path
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const tasks = await this.prisma.task.findMany({
      include: {
        TaskType: true,
        Department: true,
      },
    });

    return tasks.map(task => ({
      ...task,
      contactNo: task.contactNo.toString(), 
    }));
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        TaskType: true,
        Department: true,
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return {
      ...task,
      contactNo: task.contactNo.toString(), 
    };
  }

  async create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        taskTypeId: createTaskDto.taskTypeId,
        departmentId: createTaskDto.departmentId,
        customerName: createTaskDto.customerName,
        customerAddress: createTaskDto.customerAddress,
        gstNo: createTaskDto.gstNo,
        contactName: createTaskDto.contactName,
        contactNo: createTaskDto.contactNo.toString(), 
        emailId: createTaskDto.emailId,
        requirement: createTaskDto.requirement,
      },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const existingTask = await this.prisma.task.findUnique({ where: { id } });
    if (!existingTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return this.prisma.task.update({
      where: { id },
      data: {
        taskTypeId: updateTaskDto.taskTypeId,
        departmentId: updateTaskDto.departmentId,
        customerName: updateTaskDto.customerName,
        customerAddress: updateTaskDto.customerAddress,
        gstNo: updateTaskDto.gstNo,
        contactName: updateTaskDto.contactName,
        contactNo: updateTaskDto.contactNo.toString(), 
        emailId: updateTaskDto.emailId,
        requirement: updateTaskDto.requirement,
      },
    });
  }

  async remove(id: number) {
    const existingTask = await this.prisma.task.findUnique({ where: { id } });
    if (!existingTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return this.prisma.task.delete({ where: { id } });
  }
}
