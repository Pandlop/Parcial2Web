/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ClaseService } from './clase.service';
import { ClaseController } from './clase.controller';
import { ClaseEntity } from './clase.entity/clase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ClaseService],
  imports: [TypeOrmModule.forFeature([ClaseEntity])],
  controllers: [ClaseController]
})
export class ClaseModule { }
