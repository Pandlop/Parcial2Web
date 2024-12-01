/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsuarioBonoService } from './usuario-bono.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity/usuario.entity';
import { UsuarioBonoController } from './usuario-bono.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  providers: [UsuarioBonoService],
  controllers: [UsuarioBonoController]
})
export class UsuarioBonoModule { }
