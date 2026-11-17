import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service.js';
import { createcustomerDto } from './dto/create-customer.dto.js';
import { UpdateCategoryDto } from './dto/update-customer.dto.js';
import { paginationDTO } from '../common/dto/pagination.dto.js';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async create(createcustomerDto: CreatecustomerDto) {
    try {
      return await this.prisma.customer.create({
        data: createcustomerDto,
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new RpcException({
          status: HttpStatus.CONFLICT, // 409
          message: `Category with name "${createcustomerDto.name}" already exists`,
        });
      }
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message || 'Error creating category',
      });
    }
  }

  async findAll(paginationDto: paginationDTO) {
    const { page = 1, limit = 10 } = paginationDto;
    const totalPages = await this.prisma.categorys.count();
    const lastPage = Math.ceil(totalPages / limit);

    return {
      data: await this.prisma.categorys.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      meta: {
        total: totalPages,
        page,
        lastPage,
      },
    };
  }

  async findOne(id: number) {
    const category = await this.prisma.categorys.findFirst({
      where: { id },
    });

    if (!category) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST, // o HttpStatus.NOT_FOUND (404) según tu tabla
        message: `Category with id #${id} not found`,
      });
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const { id: _, ...data } = updateCategoryDto;
    await this.findOne(id);

    try {
      return await this.prisma.categorys.update({
        where: { id },
        data,
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new RpcException({
          status: HttpStatus.CONFLICT,
          message: `Category name already exists`,
        });
      }
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prisma.categorys.delete({
      where: { id },
    });
  }
}