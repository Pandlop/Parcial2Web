/* eslint-disable prettier/prettier */
import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ClaseBonoService } from './clase-bono.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';

@Controller('bonos')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClaseBonoController {
    constructor(private readonly claseBonoService: ClaseBonoService) { }

    @Get(':codigo')
    async findBonoByCodigo(@Param('codigo') codigo: string) {
        return await this.claseBonoService.findBonoByCodigo(codigo);
    }
}