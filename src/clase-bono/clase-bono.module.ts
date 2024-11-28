/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ClaseBonoService } from './clase-bono.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClaseEntity } from 'src/clase/clase.entity/clase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClaseEntity])],
  providers: [ClaseBonoService]
})
export class ClaseBonoModule {}
