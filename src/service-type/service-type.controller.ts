import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ServiceTypeService } from './service-type.service';
import { CreateServiceTypeDto } from './dto/create-service-type';
import { UpdateServiceTypeDto } from './dto/update-service-type';

@Controller('service-type')
export class ServiceTypeController {
  constructor(private readonly serviceTypeService: ServiceTypeService) {}

  // Create a new ServiceType
  @Post()
  async createServiceType(@Body() createServiceTypeDto: CreateServiceTypeDto) {
    return this.serviceTypeService.createServiceType(createServiceTypeDto);
  }

  // Get all ServiceTypes
  @Get()
  async getAllServiceTypes() {
    return this.serviceTypeService.getAllServiceTypes();
  }

  // Get a specific ServiceType by ID
  @Get(':id')
  async getServiceTypeById(@Param('id') id: string) {
    return this.serviceTypeService.getServiceTypeById(Number(id)); // Convert the string to a number
  }

  // Update a ServiceType by ID
  @Put(':id')
  async updateServiceType(
    @Param('id') id: string, // Keep as string to receive from route parameter
    @Body() updateServiceTypeDto: UpdateServiceTypeDto,
  ) {
    return this.serviceTypeService.updateServiceType(Number(id), updateServiceTypeDto); // Convert to number
  }

  // Delete a ServiceType by ID
  @Delete(':id')
  async deleteServiceType(@Param('id') id: string) {
    return this.serviceTypeService.deleteServiceType(Number(id)); // Convert to number
  }
}
