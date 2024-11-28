import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { BonoModule } from './bono/bono.module';
import { ClaseModule } from './clase/clase.module';
import { UsuarioBonoModule } from './usuario-bono/usuario-bono.module';
import { UsuarioClaseModule } from './usuario-clase/usuario-clase.module';
import { ClaseBonoModule } from './clase-bono/clase-bono.module';
import { UsuarioJefeModule } from './usuario-jefe/usuario-jefe.module';

@Module({
  imports: [UsuarioModule, BonoModule, ClaseModule, UsuarioBonoModule, UsuarioClaseModule, ClaseBonoModule, UsuarioJefeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
