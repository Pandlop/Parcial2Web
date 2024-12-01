/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { ClaseBonoService } from './clase-bono.service';

@Controller('bonos')
export class ClaseBonoController {
    constructor(private readonly claseBonoService: ClaseBonoService) { }

    @Get(':codigo')
    async findBonoByCodigo(@Param('codigo') codigo: string) {
        return await this.claseBonoService.findBonoByCodigo(codigo);
    }
}