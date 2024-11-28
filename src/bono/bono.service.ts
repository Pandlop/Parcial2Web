/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Long, Repository } from 'typeorm';
import { BonoEntity } from './bono.entity/bono.entity';
import { BusinessLogicException, BusinessError } from 'src/shared/errors/business-errors';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';

@Injectable()
export class BonoService {
    constructor(
        @InjectRepository(BonoEntity)
        private readonly bonoRepository: Repository<BonoEntity>,

        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ){}

    async crearBono(bono: BonoEntity): Promise<BonoEntity>{
        if(bono.monto <= 0){
            throw new BusinessLogicException("El bono no puede ser creado porque no tiene un monto", BusinessError.NOT_FOUND);
        }

        const usuario: UsuarioEntity = bono.usuario;
        if(!usuario){
            throw new BusinessLogicException("El bono no puede ser creado porque no tiene un usuario asociado", BusinessError.NOT_FOUND);
        }
        if(usuario.rol != "Profesor"){
            throw new BusinessLogicException("El bono no puede ser creado porque el usuario no tiene rol de Profesor", BusinessError.PRECONDITION_FAILED);
        }
        return await this.bonoRepository.save(bono);
    }

    async findBonoByCodigo(id: Long): Promise<BonoEntity[]>{
        const bono: BonoEntity[] = await this.bonoRepository.find({where: {id}});
        if(!bono){
            throw new BusinessLogicException("El bbno con el id dado no fue encontrado", BusinessError.NOT_FOUND);
        }
    
        return bono
    }

    async findAllBonosByUsuario(id: Long): Promise<BonoEntity[]>{
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id}, relations: ["bonos"]});
        if(!usuario){
            throw new BusinessLogicException("El usuario con el id dado no fue encontrado", BusinessError.NOT_FOUND);
        }
        return usuario.bonos;
    }

    async deleteBonoId(id: Long) {
        const bono: BonoEntity = await this.bonoRepository.findOne({where: {id}});
        if(!bono){
            throw new BusinessLogicException("El bono con el id dado no fue encontrado", BusinessError.NOT_FOUND);
        }

        if(bono.calificacion.value > 4){
            throw new BusinessLogicException("El bono con el id dado no puede ser eliminado porque tiene una calificación mayor a 4", BusinessError.PRECONDITION_FAILED)
        }
        await this.bonoRepository.remove(bono);
    }
}
