import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-customer.dto.js';
import { IsInt, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  id: number;
}
