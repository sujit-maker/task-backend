import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
  

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/hods')
  async getHODs() {
    return this.userService.getHODs();
  }
  
  @Get('/executives')
  async getExecutives() {
    return this.userService.getExecutives();
  }
  
  @Get('/managers')
  async getManagers() {
    return this.userService.getManagers();
  }
  
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.userService.getUserById(Number(id));
  }
  

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(Number(id), updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(Number(id));
  }
}
