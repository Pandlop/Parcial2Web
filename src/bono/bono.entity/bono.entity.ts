/* eslint-disable prettier/prettier */

import { ClaseEntity } from "../../clase/clase.entity/clase.entity";
import { UsuarioEntity } from "../../usuario/usuario.entity/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BonoEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    monto: number

    @Column("double precision")
    calificacion: number

    @Column()
    palabra_clave: string

    @ManyToOne(() => UsuarioEntity, usuario => usuario.bonos)
    usuario: UsuarioEntity

    @ManyToOne(() => ClaseEntity, clase => clase.bonos)
    clase: ClaseEntity
}
