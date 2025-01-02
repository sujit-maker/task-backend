import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateServiceTypeDto } from './dto/create-service-type';
import { UpdateServiceTypeDto } from './dto/update-service-type';

@Injectable()
export class ServiceTypeService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new ServiceType
  async createServiceType(createServiceTypeDto: CreateServiceTypeDto) {
    const { serviceType } = createServiceTypeDto;
    return this.prisma.serviceType.create({
      data: {
        serviceType,
      },
    });
  }

  // Get all ServiceTypes
  async getAllServiceTypes() {
    return this.prisma.serviceType.findMany();
  }

  // Get a specific ServiceType by ID
  async getServiceTypeById(id: number) {
    return this.prisma.serviceType.findUnique({
      where: { id },
    });
  }

  // Update a ServiceType by ID
  async updateServiceType(id: number, updateServiceTypeDto: UpdateServiceTypeDto) {
    const { serviceType } = updateServiceTypeDto;
    return this.prisma.serviceType.update({
      where: { id },
      data: {
        serviceType,
      },
    });
  }

  // Delete a ServiceType by ID
  async deleteServiceType(id: number) {
    return this.prisma.serviceType.delete({
      where: { id },
    });
  }
}
