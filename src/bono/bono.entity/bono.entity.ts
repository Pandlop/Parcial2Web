/* eslint-disable prettier/prettier */

import { ClaseEntity } from "src/clase/clase.entity/clase.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity/usuario.entity";
import { Column, Double, Entity, Long, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BonoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: Long

    @Column()
    monto: number

    @Column()
    calificacion: Double

    @Column()
    palabra_clave: string

    @ManyToOne(() => UsuarioEntity, usuario => usuario.bonos)
    usuario: UsuarioEntity

    @ManyToOne(() => ClaseEntity, clase => clase.bonos)
    clase: ClaseEntity
}
