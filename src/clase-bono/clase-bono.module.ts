/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ClaseBonoService } from './clase-bono.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClaseEntity } from '../clase/clase.entity/clase.entity';
import { ClaseBonoController } from './clase-bono.controller';
import { BonoEntity } from 'src/bono/bono.entity/bono.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClaseEntity, BonoEntity])],
  providers: [ClaseBonoService],
  controllers: [ClaseBonoController]
})
export class ClaseBonoModule { }