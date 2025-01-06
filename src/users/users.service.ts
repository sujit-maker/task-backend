import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const { password, departmentId, ...rest } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.users.create({
      data: {
        ...rest,
        password: hashedPassword,
        Department: {
          connect: {
            id: departmentId,
          },
        },
      },
    });
  }

  async getAllUsers() {
    return this.prisma.users.findMany();
  }

  async getUserById(id: number) {
    return this.prisma.users.findUnique({
      where: { id },
    });
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


  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const { password, ...rest } = updateUserDto;

    let updatedData: Partial<UpdateUserDto> = { ...rest };

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
