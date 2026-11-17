import { Module } from '@nestjs/common';
import { CategoryModule } from './customer/customer.module.js';

import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [CategoryModule,ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [],
})
export class AppModule {}
