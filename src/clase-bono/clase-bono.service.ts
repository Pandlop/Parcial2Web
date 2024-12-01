/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BonoEntity } from '../bono/bono.entity/bono.entity';
import { ClaseEntity } from '../clase/clase.entity/clase.entity';
import { BusinessLogicException, BusinessError } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class ClaseBonoService {
    constructor(
        @InjectRepository(ClaseEntity)
        private readonly claseRepository: Repository<ClaseEntity>,
    ) { }


    async findBonoByCodigo(codigo: string): Promise<BonoEntity[]> {
        const clase = await this.claseRepository.findOne({ where: { codigo }, relations: ["bonos"] });
        if (!clase) {
            throw new BusinessLogicException("La clase con el código dado no fue encontrada", BusinessError.NOT_FOUND);
        }
        return clase.bonos;
    }
}
