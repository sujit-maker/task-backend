import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Ensure correct path
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.task.findMany({
      include: {
        Service: true,
        Department: true,
        Site:true,
        Customer:true,
      },
    });
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
    return task;
  }
  
  async create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        serviceId: createTaskDto.serviceId,
        departmentId: createTaskDto.departmentId,
        customerId: createTaskDto.customerId,
        siteId: createTaskDto.siteId,
        workScope: createTaskDto.workScope,
        proposedDate: createTaskDto.proposedDate,
        priority: createTaskDto.priority,
       remark: createTaskDto.remark,
        status: createTaskDto.status,
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
        customerId: updateTaskDto.customerId,
        siteId:updateTaskDto.siteId,
        workScope: updateTaskDto.workScope,
        proposedDate: updateTaskDto.proposedDate,
        priority: updateTaskDto.priority,
       remark: updateTaskDto.remark,
        status: updateTaskDto.status,
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
