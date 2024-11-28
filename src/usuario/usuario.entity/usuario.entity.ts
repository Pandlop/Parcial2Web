/* eslint-disable prettier/prettier */

import { BonoEntity } from "src/bono/bono.entity/bono.entity";
import { ClaseEntity } from "src/clase/clase.entity/clase.entity";
import { Column, Entity, Long, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UsuarioEntity {
    @PrimaryGeneratedColumn('uuid')
    id: Long;

    @Column()
    num_cedula: number

    @Column()
    nombre: string

    @Column()
    grupo_investigacion: string

    @Column()
    num_extension: number

    @Column()
    rol: string

    @Column()
    jefe: UsuarioEntity

    @OneToMany(() => BonoEntity, bono => bono.usuario)
    bonos: BonoEntity[];

    @OneToMany(() => ClaseEntity, clase => clase.usuario)
    clases: ClaseEntity[];
}
