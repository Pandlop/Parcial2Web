/* eslint-disable prettier/prettier */
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/
import { TypeOrmModule } from '@nestjs/typeorm';
import { BonoEntity } from '../../bono/bono.entity/bono.entity';
import { ClaseEntity } from '../../clase/clase.entity/clase.entity';
import { UsuarioEntity } from '../../usuario/usuario.entity/usuario.entity';


export const TypeOrmTestingConfig = () => [
    TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [UsuarioEntity, ClaseEntity, BonoEntity],
        synchronize: true
    }),
    TypeOrmModule.forFeature([UsuarioEntity, ClaseEntity, BonoEntity]),
];
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/