import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { TasktypeService } from './tasktype.service';
import { CreateTaskTypeDto } from './dto/create-tasktype.dto';
import { UpdateTaskTypeDto } from './dto/update-tasktype.dto';
import { ParseIntPipe } from '@nestjs/common';

@Controller('tasktype')
export class TasktypeController {
  constructor(private readonly tasktypeService: TasktypeService) {}

  @Post()
  create(@Body() createTaskTypeDto: CreateTaskTypeDto) {
    return this.tasktypeService.create(createTaskTypeDto);
  }

  @Get()
  findAll() {
    return this.tasktypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tasktypeService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskTypeDto: UpdateTaskTypeDto
  ) {
    return this.tasktypeService.update(id, updateTaskTypeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tasktypeService.remove(id);
  }
}
