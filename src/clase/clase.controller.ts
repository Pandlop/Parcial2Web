/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { ClaseService } from './clase.service';
import { ClaseEntity } from './clase.entity/clase.entity';
import { plainToInstance } from 'class-transformer';
import { ClaseDto } from './clase.dto/clase.dto';

@Controller('clases')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClaseController {
    constructor(private readonly claseService: ClaseService) { }

    @Post()
    async create(@Body() claseDto: ClaseDto) {
        const clase: ClaseEntity = plainToInstance(ClaseEntity, claseDto);
        return await this.claseService.crearClase(clase);
    }

    @Get(':claseId')
    async findClaseById(@Param("claseId") claseId: number) {
        return await this.claseService.findClaseById(claseId);
    }


}
