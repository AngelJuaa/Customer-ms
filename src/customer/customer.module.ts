import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service.js';
import { CustomerController } from './customer.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';


@Module({
  controllers: [CustomerController],
  providers: [CustomerService],
  imports: [PrismaModule]
})
export class CustomerModule {}
