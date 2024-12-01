/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Test, TestingModule } from '@nestjs/testing';
import { BonoService } from './bono.service';
import { Double, Long, Repository } from 'typeorm';
import { BonoEntity } from './bono.entity/bono.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { UsuarioEntity } from '../usuario/usuario.entity/usuario.entity';

describe('BonoService', () => {
  let service: BonoService;
  let bonoRepository: Repository<BonoEntity>;
  let usuarioRepository: Repository<UsuarioEntity>;
  let usuario: UsuarioEntity;
  let bonoList: BonoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [BonoService],
    }).compile();

    service = module.get<BonoService>(BonoService);
    bonoRepository = module.get<Repository<BonoEntity>>(getRepositoryToken(BonoEntity));
    usuarioRepository = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));

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
      num_extension: faker.number.int({ min: 1 }),
      rol: "Profesor",
      jefe: null,
      bonos: bonoList
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crearBono should return a new bono', async () => {
    const newBono: BonoEntity = await bonoRepository.save({
      monto: faker.number.int({ min: 1, max: 100 }),
      calificacion: faker.number.float({ min: 1, max: 5 }),
      palabra_clave: faker.lorem.word(),
      usuario: usuario,

    });
    const id = newBono.id;
    expect(newBono).not.toBeNull();

    const storedBono: BonoEntity = await bonoRepository.findOne({ where: { id }, relations: ['usuario', 'clase'] });
    expect(storedBono).not.toBeNull();
    expect(storedBono.monto).toEqual(newBono.monto)
    expect(storedBono.calificacion).toEqual(newBono.calificacion)
    expect(storedBono.palabra_clave).toEqual(newBono.palabra_clave)
  });

  it('crearBono should return an error when bono has monto less or equal than 0', async () => {
    const bono: BonoEntity = {
      id: 6,
      monto: 0,
      calificacion: faker.number.float({ min: 1, max: 5 }),
      palabra_clave: faker.lorem.word(),
      usuario: usuario,
      clase: null
    }

    await expect(() => service.crearBono(bono)).rejects.toHaveProperty('message', 'El bono no puede ser creado porque no tiene un monto valido');
  });

  it('crearBono should return an error when bono has no usuario', async () => {
    const bono: BonoEntity = {
      id: 6,
      monto: faker.number.int({ min: 1, max: 100 }),
      calificacion: faker.number.float({ min: 1, max: 5 }),
      palabra_clave: faker.lorem.word(),
      usuario: null,
      clase: null
    }

    await expect(() => service.crearBono(bono)).rejects.toHaveProperty('message', 'El bono no puede ser creado porque no tiene un usuario asociado');
  });

  it('crearBono should return an error when usuario has no rol Profesor', async () => {
    const usuarioTemp = usuario;
    usuarioTemp.rol = "Estudiante";
    const bono: BonoEntity = {
      id: 6,
      monto: faker.number.int({ min: 1, max: 100 }),
      calificacion: faker.number.float({ min: 1, max: 5 }),
      palabra_clave: faker.lorem.word(),
      usuario: usuarioTemp,
      clase: null
    }

    await expect(() => service.crearBono(bono)).rejects.toHaveProperty('message', 'El bono no puede ser creado porque el usuario no tiene rol de Profesor');
  });


  it('deleteBonoId should remove a bono', async () => {
    const bono = bonoList[0];

    await service.deleteBonoId(bono.id);
    const storedBono: BonoEntity = await bonoRepository.findOne({ where: { id: bono.id } })
    expect(storedBono).toBeNull();
  });

  it('deleteBonoId should return an error when bono has calificacion greater than 4', async () => {
    const bono = bonoList[0];
    bono.calificacion = 5;
    await bonoRepository.save(bono);


    await expect(() => service.deleteBonoId(bono.id)).rejects.toHaveProperty('message', 'El bono con el id dado no puede ser eliminado porque tiene una calificación mayor a 4');
  });

});
