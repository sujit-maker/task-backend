import { Module } from '@nestjs/common';
import { TasktypeController } from './tasktype.controller';
import { TasktypeService } from './tasktype.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TasktypeController],
  providers: [TasktypeService,PrismaService]
})
export class TasktypeModule {}
