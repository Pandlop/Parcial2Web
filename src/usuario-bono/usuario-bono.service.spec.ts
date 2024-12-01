/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioBonoService } from './usuario-bono.service';
import { UsuarioEntity } from '../usuario/usuario.entity/usuario.entity';
import { BonoEntity } from '../bono/bono.entity/bono.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';

describe('UsuarioBonoService', () => {
  let service: UsuarioBonoService;
  let usuarioRepository: Repository<UsuarioEntity>;
  let bonoRepository: Repository<BonoEntity>;
  let usuario: UsuarioEntity;
  let bonoList: BonoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [UsuarioBonoService],
    }).compile();

    service = module.get<UsuarioBonoService>(UsuarioBonoService);
    usuarioRepository = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));
    bonoRepository = module.get<Repository<BonoEntity>>(getRepositoryToken(BonoEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    bonoRepository.clear();
    usuarioRepository.clear();

    bonoList = [];
    for (let i = 0; i < 5; i++) {
      const bono: BonoEntity = await bonoRepository.save({
        monto: faker.number.int({ min: 1, max: 100 }),
        calificacion: faker.number.float({ min: 1, max: 5 }),
        palabra_clave: faker.lorem.word()
      })
      bonoList.push(bono);
    }

    usuario = await usuarioRepository.save({
      num_cedula: faker.number.int({ min: 1 }),
      nombre: faker.person.fullName(),
      grupo_investigacion: "TICSW",
      num_extension: faker.number.int({ min: 8, max: 8 }),
      rol: "Profesor",
      jefe: null,
      bonos: bonoList
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAllBonosByUsuario return all bonos from a user', async () => {
    const bonos: BonoEntity[] = await service.findAllBonosByUsuario(usuario.id);
    expect(bonos.length).toBe(5);

  });

  it('findAllBonosByUsuario return an empty array if user does not exist', async () => {
    await expect(() => service.findAllBonosByUsuario(0)).rejects.toHaveProperty('message', 'El usuario con el id dado no fue encontrado');
  });
});
