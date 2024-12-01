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

        @InjectRepository(BonoEntity)
        private readonly bonoRepository: Repository<BonoEntity>,
    ) { }


    async findBonoByCodigo(codigo: string): Promise<BonoEntity> {
        const clase: ClaseEntity = await this.claseRepository.findOne({ where: { codigo } });
        if (!clase) {
            throw new BusinessLogicException("La clase con el código dado no fue encontrada", BusinessError.NOT_FOUND);
        }
        const bono: BonoEntity = await this.bonoRepository.findOne({ where: { clase }, relations: ['clase'] });
        if (!bono) {
            throw new BusinessLogicException("No hay ningun bono asociado a la clase", BusinessError.NOT_FOUND);
        }

        return bono;
    }
}