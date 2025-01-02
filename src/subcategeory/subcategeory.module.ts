import { Module } from '@nestjs/common';
import { SubcategeoryController } from './subcategeory.controller';
import { SubcategeoryService } from './subcategeory.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SubcategeoryController],
  providers: [SubcategeoryService,PrismaService]
})
export class SubcategeoryModule {}
