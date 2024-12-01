/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { BonoEntity } from '../bono/bono.entity/bono.entity';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let usuarioRepository: Repository<UsuarioEntity>;
  let bonoRepository: Repository<BonoEntity>;
  let usuarioList: UsuarioEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [UsuarioService],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    usuarioRepository = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));
    bonoRepository = module.get<Repository<BonoEntity>>(getRepositoryToken(BonoEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    usuarioRepository.clear();
    bonoRepository.clear();

    usuarioList = [];
    for (let i = 0; i < 5; i++) {
      const usuario: UsuarioEntity = await usuarioRepository.save({
        num_cedula: faker.number.int({ min: 1 }),
        nombre: faker.person.fullName(),
        grupo_investigacion: "TICSW",
        num_extension: faker.number.int({ min: 1 }),
        rol: "Profesor",
      })
      usuarioList.push(usuario);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crearUsuario should return a new usuario', async () => {
    const usuario: UsuarioEntity = {
      id: 1,
      num_cedula: faker.number.int({ min: 1 }),
      nombre: faker.person.fullName(),
      grupo_investigacion: "TICSW",
      num_extension: faker.number.int({ min: 8, max: 8 }),
      rol: "Profesor",
      jefe: null,
      bonos: [],
      clases: []
    };

    const newUsuario: UsuarioEntity = await service.crearUsuario(usuario);
    expect(newUsuario).not.toBeNull();

    const storedUsuario: UsuarioEntity = await usuarioRepository.findOne({ where: { id: newUsuario.id } });
    expect(storedUsuario).not.toBeNull();
    expect(storedUsuario.num_cedula).toEqual(usuario.num_cedula);
    expect(storedUsuario.nombre).toEqual(usuario.nombre);
    expect(storedUsuario.grupo_investigacion).toEqual(usuario.grupo_investigacion);
    expect(storedUsuario.num_extension).toEqual(usuario.num_extension);
    expect(storedUsuario.rol).toEqual(usuario.rol);

  });

  it('crearUsuario should throw an error if the group is not valid', async () => {
    const usuario: UsuarioEntity = {
      id: 1,
      num_cedula: faker.number.int({ min: 1 }),
      nombre: faker.person.fullName(),
      grupo_investigacion: "nan",
      num_extension: faker.number.int({ min: 8, max: 8 }),
      rol: "Profesor",
      jefe: null,
      bonos: [],
      clases: []
    };

    await expect(() => service.crearUsuario(usuario)).rejects.toHaveProperty('message', 'El usuario no puede ser creado porque tiene un grupo de investigación no válido');
  });

  it('crearUsuario should throw an error if the extension number is not valid', async () => {
    const usuario: UsuarioEntity = {
      id: 1,
      num_cedula: faker.number.int({ min: 1 }),
      nombre: faker.person.fullName(),
      grupo_investigacion: "TICSW",
      num_extension: 1234,
      rol: "Decana",
      jefe: null,
      bonos: [],
      clases: []
    };

    await expect(() => service.crearUsuario(usuario)).rejects.toHaveProperty('message', 'El usuario no puede ser creado porque el numero de extension no es de 8 digitos');
  });

  it('findUsuarioById should return a usuario', async () => {
    const storedUsuario: UsuarioEntity = usuarioList[0];
    const usuario: UsuarioEntity = await service.findUsuarioById(storedUsuario.id);
    expect(usuario).not.toBeNull();
    expect(usuario.id).toEqual(storedUsuario.id);
    expect(usuario.num_cedula).toEqual(storedUsuario.num_cedula);
    expect(usuario.nombre).toEqual(storedUsuario.nombre);
    expect(usuario.grupo_investigacion).toEqual(storedUsuario.grupo_investigacion);
    expect(usuario.num_extension).toEqual(storedUsuario.num_extension);
    expect(usuario.rol).toEqual(storedUsuario.rol);

  });

  it('findUsuarioById should throw an error if the usuario does not exist', async () => {
    await expect(() => service.findUsuarioById(0)).rejects.toHaveProperty('message', 'El usuario con el id dado no fue encontrado');
  });

  it('eliminarUsuario should delete a usuario', async () => {
    const storedUsuario: UsuarioEntity = usuarioList[0];
    await service.eliminarUsuario(storedUsuario.id);
    const usuario: UsuarioEntity = await usuarioRepository.findOne({ where: { id: storedUsuario.id } });
    expect(usuario).toBeNull();
  });

  it('eliminarUsuario should throw an error if the usuario does not exist', async () => {
    await expect(() => service.eliminarUsuario(0)).rejects.toHaveProperty('message', 'El usuario con el id dado no fue encontrado');
  });

  it('eliminarUsuario should throw an error if the usuario is a Decana', async () => {
    const storedUsuario: UsuarioEntity = usuarioList[0];
    storedUsuario.rol = "Decana";
    await usuarioRepository.save(storedUsuario);

    await expect(() => service.eliminarUsuario(storedUsuario.id)).rejects.toHaveProperty('message', 'El usuario con el id dado no puede ser eliminado porque tiene rol de Decana');
  });

  it('eliminarUsuario should throw an error if the usuario has bonos', async () => {
    const storedUsuario: UsuarioEntity = usuarioList[0];

    const bono: BonoEntity = await bonoRepository.save({
      monto: faker.number.int({ min: 1, max: 100 }),
      calificacion: faker.number.float({ min: 1, max: 5 }),
      palabra_clave: faker.lorem.word(),
      usuario: storedUsuario,
    });

    await expect(() => service.eliminarUsuario(storedUsuario.id)).rejects.toHaveProperty('message', 'El usuario con el id dado no puede ser eliminado porque tiene un bono asociados');
  });
});
