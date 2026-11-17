import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CustomerService } from './customer.service.js';
import { CreateCustomerDto } from './dto/create-customer.dto.js';
import { UpdateCategoryDto } from './dto/update-customer.dto.js';
import { paginationDTO } from '../common/dto/pagination.dto.js';

@Controller()
export class CategoryController {
  constructor(private readonly customerService: customerService) {}

  @MessagePattern({ cmd: 'create_category' })
  create(@Payload() createCategoryDto: CreateCategoryDto) {
    return this.customerService.create(createCategoryDto);
  }

  @MessagePattern({ cmd: 'find_all_categories' })
  findAll(@Payload() paginationDto: paginationDTO) {
    return this.customerService.findAll(paginationDto);
  }

  @MessagePattern({ cmd: 'find_one_category' })
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.customerService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_category' })
  update(@Payload() updateCategoryDto: UpdateCategoryDto) {
    return this.customerService.update(updateCategoryDto.id, updateCategoryDto);
  }

  @MessagePattern({ cmd: 'remove_category' })
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.customerService.remove(id);
  }
}