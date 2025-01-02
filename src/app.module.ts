import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';
import { ServiceTypeModule } from './service-type/service-type.module';
import { ServiceController } from './service/service.controller';
import { ServiceService } from './service/service.service';
import { ServiceModule } from './service/service.module';
import { PrismaModule } from './prisma/prisma.module';
import { VendorModule } from './vendor/vendor.module';
import { CustomerController } from './customer/customer.controller';
import { CustomerModule } from './customer/customer.module';
import { SiteModule } from './site/site.module';
import { SubcategeoryModule } from './subcategeory/subcategeory.module';
import { AuthModule } from './auth/auth.module';
import { DepartmentModule } from './department/department.module';
import { TasktypeModule } from './tasktype/tasktype.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [UsersModule, CategoryModule, ProductsModule, ServiceTypeModule, ServiceModule,PrismaModule, VendorModule, CustomerModule, SiteModule, SubcategeoryModule, AuthModule, DepartmentModule, TasktypeModule, TaskModule],
  controllers: [ServiceController, CustomerController],
  providers: [ServiceService],
})
export class AppModule {}
