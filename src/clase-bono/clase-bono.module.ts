/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ClaseBonoService } from './clase-bono.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClaseEntity } from '../clase/clase.entity/clase.entity';
import { ClaseBonoController } from './clase-bono.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClaseEntity])],
  providers: [ClaseBonoService],
  controllers: [ClaseBonoController]
})
export class ClaseBonoModule { }
