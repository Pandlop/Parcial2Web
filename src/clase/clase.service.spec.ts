/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Test, TestingModule } from '@nestjs/testing';
import { ClaseService } from './clase.service';
import { Repository } from 'typeorm';
import { ClaseEntity } from './clase.entity/clase.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('ClaseService', () => {
  let service: ClaseService;
  let repository: Repository<ClaseEntity>;
  let claseList: ClaseEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClaseService],
    }).compile();

    service = module.get<ClaseService>(ClaseService);
    repository = module.get<Repository<ClaseEntity>>(getRepositoryToken(ClaseEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();

    claseList = [];
    for (let i = 0; i < 5; i++) {
      const clase: ClaseEntity = await repository.save({
        nombre: faker.lorem.word(),
        codigo: faker.string.alphanumeric(10),
        num_creditos: faker.number.int({ min: 1 }),
      })
      claseList.push(clase);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crearClase should return a new clase', async () => {
    const clase: ClaseEntity = {
      id: 1,
      nombre: faker.lorem.word(),
      codigo: faker.string.alphanumeric(10),
      num_creditos: faker.number.int({ min: 1 }),
      bonos: [],
      usuario: null
    };

    const newClase: ClaseEntity = await service.crearClase(clase);
    expect(newClase).not.toBeNull();

    const storedClase: ClaseEntity = await repository.findOne({ where: { id: newClase.id } });
    expect(storedClase).not.toBeNull();
    expect(storedClase.nombre).toEqual(clase.nombre);
    expect(storedClase.codigo).toEqual(clase.codigo);
    expect(storedClase.num_creditos).toEqual(clase.num_creditos);

  });

  it('crearClase should throw an error if the code is not 10 characters long', async () => {
    const clase: ClaseEntity = {
      id: 1,
      nombre: faker.lorem.word(),
      codigo: "11",
      num_creditos: faker.number.int({ min: 1 }),
      bonos: [],
      usuario: null
    };

    await expect(() => service.crearClase(clase)).rejects.toHaveProperty('message', 'La clase no puede ser creada porque el codigo no tiene 10 caracteres');
  });

  it('findClaseById should return a clase', async () => {
    const storedClase: ClaseEntity = claseList[0];
    const clase: ClaseEntity = await service.findClaseById(storedClase.id);
    expect(clase).not.toBeNull();
    expect(clase.nombre).toEqual(storedClase.nombre);
    expect(clase.codigo).toEqual(storedClase.codigo);
    expect(clase.num_creditos).toEqual(storedClase.num_creditos);
  });

  it('findClaseById should throw an error if the clase is not found', async () => {
    await expect(() => service.findClaseById(0)).rejects.toHaveProperty('message', 'La clase con el id dado no fue encontrada');
  });
});
