import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const { password, departmentIds, ...rest } = createUserDto;
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    return this.prisma.users.create({
      data: {
        ...rest,
        password: hashedPassword,
        departments: {
          connect: departmentIds.map((id) => ({ id })), // Correctly connect multiple departments
        },
      },
    });
  }

  async getManagersByHOD(hodId: number) {
    return this.prisma.users.findMany({
      where: {
        userType: 'MANAGER',
        hodId, // Assuming `hodId` is a foreign key in the users table
      },
    });
  }

  async getExecutivesByManager(managerId: number) {
    return this.prisma.users.findMany({
      where: {
        userType: 'EXECUTIVE',
        managerId, // Assuming `managerId` is a foreign key in the users table
      },
    });
  }

  async getAllUsers() {
    return this.prisma.users.findMany({
      include: {
        departments: true, // Include departments along with users
      },
    });
  }
  

  async getUserById(id: number) {
    return this.prisma.users.findUnique({
      where: { id },
      include: {
        departments: true, // Include departments when fetching user data
      },
    });
  }

  async fetchTasksById(userId: number) {
    const numericId = Number(userId);
  
    if (isNaN(numericId)) {
      throw new NotFoundException(`Invalid User ID: ${userId}`);
    }
  
    const tasks = await this.prisma.task.findMany({
      where: {
        OR: [
          { hodId: numericId },
          { managerId: numericId },
          { executiveId: numericId },
        ],
      },
      include: {
        service: {
          select: { serviceName: true },
        },
        department: {
          select: { departmentName: true },
        },
        customer: {
          select: { customerName: true },
        },
        site: {
          select: { siteName: true },
        },
      },
    });
  
    if (!tasks || tasks.length === 0) {
      throw new NotFoundException(`No tasks found for user with ID ${userId}`);
    }
  
    return tasks;
  }
  
  

  async getUsersByType(userType: string) {
    return this.prisma.users.findMany({
      where: { userType },
    });
  }

  async getHODs() {
    return this.getUsersByType('HOD');
  }

  async getExecutives() {
    return this.getUsersByType('EXECUTIVE');
  }

  async getManagers() {
    return this.getUsersByType('MANAGER');
  }

  async getHODsByDepartment(departmentName: string) {
    return this.prisma.users.findMany({
      where: {
        userType: 'HOD',
        departments: {  // Use 'departments' (plural) instead of 'Department'
          some: {       // 'some' is necessary for filtering in many-to-many relationships
            departmentName: departmentName, // Filtering based on department name
          },
        },
      },
      include: {
        departments: true, // Include related departments
      },
    });
  }

  async getManagersByDepartment(departmentName: string) {
    return this.prisma.users.findMany({
      where: {
        userType: 'MANAGER',
        departments: {  // Use 'departments' (plural) instead of 'Department'
          some: {       // 'some' is necessary for filtering in many-to-many relationships
            departmentName: departmentName, // Filtering based on department name
          },
        },
      },
      include: {
        departments: true, // Include related departments
      },
    });
  }

  async getExecutiveByDepartment(departmentName: string) {
    return this.prisma.users.findMany({
      where: {
        userType: 'EXECUTIVE',
        departments: {  // Use 'departments' (plural) instead of 'Department'
          some: {       // 'some' is necessary for filtering in many-to-many relationships
            departmentName: departmentName, // Filtering based on department name
          },
        },
      },
      include: {
        departments: true, // Include related departments
      },
    });
  }

  
  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const { password, ...rest } = updateUserDto;

    let updatedData: Partial<UpdateUserDto> = { ...rest };

    // If there's a new password, hash it and include in the update
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData = { ...updatedData, password: hashedPassword };
    }

    return this.prisma.users.update({
      where: { id },
      data: updatedData,
    });
  }

  async deleteUser(id: number) {
    return this.prisma.users.delete({
      where: { id },
    });
  }
}
