/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { UsuarioService } from './usuario.service';
import { plainToInstance } from 'class-transformer';
import { UsuarioDto } from './usuario.dto/usuario.dto';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { Long } from 'typeorm';

@Controller('usuarios')
@UseInterceptors(BusinessErrorsInterceptor)
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Post()
    async create(@Body() usuarioDto: UsuarioDto) {
        const usuario: UsuarioEntity = plainToInstance(UsuarioEntity, usuarioDto);
        return await this.usuarioService.crearUsuario(usuario);
    }

    @Get(':usuarioId')
    async findUsuarioById(usuarioId: Long) {
        return await this.usuarioService.findUsuarioById(usuarioId);
    }

    @Delete(':usuarioId')
    @HttpCode(204)
    async delete(@Param('usuarioId') usuarioId: Long) {
        return await this.usuarioService.eliminarUsuario(usuarioId);
    }
}
