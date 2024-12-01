/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { BonoModule } from './bono/bono.module';
import { ClaseModule } from './clase/clase.module';
import { UsuarioBonoModule } from './usuario-bono/usuario-bono.module';
import { ClaseBonoModule } from './clase-bono/clase-bono.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BonoEntity } from './bono/bono.entity/bono.entity';
import { ClaseEntity } from './clase/clase.entity/clase.entity';
import { UsuarioEntity } from './usuario/usuario.entity/usuario.entity';
import { ClaseBonoModule } from './clase-bono/clase-bono.module';

@Module({
  imports: [UsuarioModule, BonoModule, ClaseModule, UsuarioBonoModule, ClaseBonoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'parcial2',
      entities: [UsuarioEntity, ClaseEntity, BonoEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
    ClaseBonoModule,
    UsuarioBonoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
