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
        Service: true,
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
        Service: true,
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
        serviceId: createTaskDto.serviceId,
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
        serviceId: updateTaskDto.serviceId,
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

  // Fetch services based on departmentId
async findServicesByDepartment(departmentId: number) {
  // Ensure departmentId is a number (in case it's passed as a string)
  const parsedDepartmentId = parseInt(departmentId.toString(), 10);

  // Fetch services for the departmentId
  const services = await this.prisma.service.findMany({
    where: {
      departmentId: parsedDepartmentId,
    },
  });

  return services;
}


}
