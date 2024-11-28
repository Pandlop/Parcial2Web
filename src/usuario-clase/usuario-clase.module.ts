/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsuarioClaseService } from './usuario-clase.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  providers: [UsuarioClaseService]
})
export class UsuarioClaseModule {}
