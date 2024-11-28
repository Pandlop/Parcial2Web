/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { ClaseService } from './clase.service';
import { ClaseEntity } from './clase.entity/clase.entity';
import { plainToInstance } from 'class-transformer';
import { ClaseDto } from './clase.dto/clase.dto';
import { Long } from 'typeorm';

@Controller('clases')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClaseController {
    constructor(private readonly claseService: ClaseService) {}

    @Post()
    async create(@Body() claseDto: ClaseDto) {
        const clase: ClaseEntity = plainToInstance(ClaseEntity, claseDto);
        return await this.claseService.crearClase(clase);
    }

    @Get(':claseId')
    async findClaseById(claseId: Long) {
        return await this.claseService.findClaseById(claseId);
    }


}
