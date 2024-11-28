/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsuarioBonoService } from './usuario-bono.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  providers: [UsuarioBonoService]
})
export class UsuarioBonoModule {}
