import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioClaseService } from './usuario-clase.service';

describe('UsuarioClaseService', () => {
  let service: UsuarioClaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioClaseService],
    }).compile();

    service = module.get<UsuarioClaseService>(UsuarioClaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
