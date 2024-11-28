/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { BonoService } from './bono.service';
import { BonoDto } from './bono.dto/bono.dto';
import { plainToInstance } from 'class-transformer';
import { BonoEntity } from './bono.entity/bono.entity';
import { Long } from 'typeorm';

@Controller('bonos')
@UseInterceptors(BusinessErrorsInterceptor)
export class BonoController {
    constructor(private readonly bonoService: BonoService) {}

    @Get()
    async create(@Body() bonoDto: BonoDto) {
        const bono: BonoEntity = plainToInstance(BonoEntity, bonoDto);
        return await this.bonoService.crearBono(bono);
    }

    // @Get()
    // async findBonoByCodigo(@Param('codigo') codigo: string) {
    //     return await this.bonoService.find(codigo);
    // }

    @Get(':usuarioId')
    async findAllBonosByUsuario(@Param('usuarioId') usuarioId: Long) {
        return await this.bonoService.findAllBonosByUsuario(usuarioId);
    }

    @Delete(':bonoId')
    @HttpCode(204)
    async delete(@Param('bonoId') bonoId: Long) {
        return await this.bonoService.deleteBonoId(bonoId);
    }
     
}
