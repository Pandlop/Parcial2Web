/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Long, Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { BonoEntity } from 'src/bono/bono.entity/bono.entity';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ){}

    async crearUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
        if(usuario.rol == "Profesor"){
            if(usuario.grupo_investigacion != "TICSW" && usuario.grupo_investigacion != "IMAGINE" && usuario.grupo_investigacion != "COMIT"){
                throw new BusinessLogicException("El usuario no puede ser creado porque tiene un grupo de investigación no válido", BusinessError.PRECONDITION_FAILED)
            }
        } else if (usuario.rol == "Decana"){
            if(usuario.num_extension.toString().length != 8){
                throw new BusinessLogicException("El usuario no puede ser creado porque el numero de extension no es de 8 digitos", BusinessError.PRECONDITION_FAILED)
            }
        }
        return await this.usuarioRepository.save(usuario);
    }

    async findUsuarioById(id: Long): Promise<UsuarioEntity> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id}})
        if(!usuario){
            throw new BusinessLogicException("El usuario con el id dado no fue encontrado", BusinessError.NOT_FOUND);
        }

        return usuario
    }

    async eliminarUsuario(id: Long) {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id}, relations: ["bonos"]});
        if(!usuario){
            throw new BusinessLogicException("El usuario con el id dado no fue encontrado", BusinessError.NOT_FOUND);
        }

        if(usuario.rol == "Decana"){
            throw new BusinessLogicException("El usuario con el id dado no puede ser eliminado porque tiene rol de Decana", BusinessError.PRECONDITION_FAILED)
        }

        const bonos: BonoEntity[] = usuario.bonos;
        if(bonos.length > 0){
            throw new BusinessLogicException("El usuario con el id dado no puede ser eliminado porque tiene un bono asociados", BusinessError.PRECONDITION_FAILED)
        }

        await this.usuarioRepository.remove(usuario);
    }
 
}
