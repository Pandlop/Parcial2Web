/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BonoEntity } from '../bono/bono.entity/bono.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { UsuarioEntity } from '../usuario/usuario.entity/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioBonoService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
    ) { }

    async findAllBonosByUsuario(id: number): Promise<BonoEntity[]> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({ where: { id }, relations: ["bonos"] });
        if (!usuario) {
            throw new BusinessLogicException("El usuario con el id dado no fue encontrado", BusinessError.NOT_FOUND);
        }
        return usuario.bonos;
    }
}
