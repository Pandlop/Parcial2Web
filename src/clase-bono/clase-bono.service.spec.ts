/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ClaseBonoService } from './clase-bono.service';
import { ClaseEntity } from '../clase/clase.entity/clase.entity';
import { BonoEntity } from '../bono/bono.entity/bono.entity';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('ClaseBonoService', () => {
  let service: ClaseBonoService;
  let claseRepository: Repository<ClaseEntity>;
  let bonoRepository: Repository<BonoEntity>;
  let clase: ClaseEntity;
  let bonoList: BonoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClaseBonoService],
    }).compile();

    service = module.get<ClaseBonoService>(ClaseBonoService);
    claseRepository = module.get<Repository<ClaseEntity>>(getRepositoryToken(ClaseEntity));
    bonoRepository = module.get<Repository<BonoEntity>>(getRepositoryToken(BonoEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    bonoRepository.clear();
    claseRepository.clear();

    bonoList = [];
    for (let i = 0; i < 5; i++) {
      const bono: BonoEntity = await bonoRepository.save({
        monto: faker.number.int({ min: 1, max: 100 }),
        calificacion: faker.number.float({ min: 1, max: 5 }),
        palabra_clave: faker.lorem.word()
      })
      bonoList.push(bono);
    }

    clase = await claseRepository.save({
      nombre: faker.lorem.word(),
      codigo: "0123456789",
      num_creditos: faker.number.int({ min: 1 }),
      bonos: bonoList
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findBonoByCodigo should return a list of bonos', async () => {
    const bonos: BonoEntity[] = await service.findBonoByCodigo(clase.codigo);
    expect(bonos.length).toBe(5);
  });

  it('findBonoByCodigo should throw an exception for an invalid code', async () => {
    await expect(() => service.findBonoByCodigo("0000000000")).rejects.toHaveProperty("message", "La clase con el código dado no fue encontrada");
  });
});
