/* eslint-disable prettier/prettier */
import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { UsuarioBonoService } from './usuario-bono.service';

@Controller('usuarios')
@UseInterceptors(BusinessErrorsInterceptor)
export class UsuarioBonoController {
    constructor(private readonly usuarioBonoService: UsuarioBonoService) { }

    @Get(':usuarioId/bonos')
    async findAllBonosByUsuario(@Param('usuarioId') usuarioId: number) {
        return await this.usuarioBonoService.findAllBonosByUsuario(usuarioId);
    }
}
