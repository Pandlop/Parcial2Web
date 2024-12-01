/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { BonoService } from './bono.service';
import { BonoDto } from './bono.dto/bono.dto';
import { plainToInstance } from 'class-transformer';
import { BonoEntity } from './bono.entity/bono.entity';

@Controller('bonos')
@UseInterceptors(BusinessErrorsInterceptor)
export class BonoController {
    constructor(private readonly bonoService: BonoService) { }

    @Post()
    async create(@Body() bonoDto: BonoDto) {
        const bono: BonoEntity = plainToInstance(BonoEntity, bonoDto);
        return await this.bonoService.crearBono(bono);
    }

    @Delete(':bonoId')
    @HttpCode(204)
    async delete(@Param('bonoId') bonoId: number) {
        return await this.bonoService.deleteBonoId(bonoId);
    }

}
