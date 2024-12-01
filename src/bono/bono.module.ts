/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BonoService } from './bono.service';
import { BonoController } from './bono.controller';
import { BonoEntity } from './bono.entity/bono.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';

@Module({
  providers: [BonoService],
  imports: [TypeOrmModule.forFeature([BonoEntity, UsuarioEntity])],
  controllers: [BonoController]
})
export class BonoModule { }
