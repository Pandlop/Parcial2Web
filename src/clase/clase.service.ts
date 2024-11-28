/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClaseEntity } from './clase.entity/clase.entity';
import { Long, Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from 'src/shared/errors/business-errors';

@Injectable()
export class ClaseService {
    constructor(
        @InjectRepository(ClaseEntity)
        private readonly claseRepository: Repository<ClaseEntity>,
    ) {}

    async crearClase(clase: ClaseEntity): Promise<ClaseEntity> {
        if(clase.codigo.length !== 10) {
            throw new BusinessLogicException("La clase no puede ser creada porque el codigo no tiene 10 caracteres", BusinessError.NOT_FOUND);
        }
        return await this.claseRepository.save(clase);
    }

    async findClaseById(id: Long): Promise<ClaseEntity> {
        const clase: ClaseEntity = await this.claseRepository.findOne({where: {id}});
        if(!clase){
            throw new BusinessLogicException("La clase con el id dado no fue encontrada", BusinessError.NOT_FOUND);
        }
        return clase
    }
}
