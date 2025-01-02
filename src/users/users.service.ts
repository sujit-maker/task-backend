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

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to the database and connect the department using the departmentId
    return this.prisma.users.create({
      data: {
        ...rest,  // Spread the rest of the fields from the DTO
        password: hashedPassword,
        Department: {  // Use the correct relation (Department)
          connect: {  // Connect using the departmentId
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
