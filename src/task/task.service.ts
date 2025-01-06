import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.task.findMany({
      include: {
        Service: {
          select: { serviceName: true }, 
        },
        Department: {
          select: { departmentName: true },
        },
        Customer: {
          select: { customerName: true },
        },
        Site: {
          select: { siteName: true }, 
        },
      },
    });
  }
  
  
  
  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        Service: {
          select: {
            serviceName: true, 
          },
        },
        Department: {
          select: {
            departmentName: true, 
          },
        },
        Customer: {
          select: {
            customerName: true, 
          },
        },
        Site: {
          select: {
            siteName: true, 
          },
        },
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
        hodId: createTaskDto.hodId,
        managerId: createTaskDto.managerId,
        executiveId: createTaskDto.executiveId
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
        hodId:updateTaskDto.hodId,
        managerId:updateTaskDto.managerId,
        executiveId:updateTaskDto.executiveId
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

  
async findServicesByDepartment(departmentId: number) {
  
  const parsedDepartmentId = parseInt(departmentId.toString(), 10);

  
  const services = await this.prisma.service.findMany({
    where: {
      departmentId: parsedDepartmentId,
    },
  });

  return services;
}
}
