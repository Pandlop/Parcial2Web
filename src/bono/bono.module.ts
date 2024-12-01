/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BonoService } from './bono.service';
import { BonoController } from './bono.controller';
import { BonoEntity } from './bono.entity/bono.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [BonoService],
  imports: [TypeOrmModule.forFeature([BonoEntity])],
  controllers: [BonoController]
})
export class BonoModule { }
