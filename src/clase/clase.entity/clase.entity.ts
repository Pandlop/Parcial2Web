/* eslint-disable prettier/prettier */

import { BonoEntity } from "src/bono/bono.entity/bono.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity/usuario.entity";
import { Column, Entity, Long, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ClaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: Long

    @Column()
    nombre: string

    @Column()
    codigo: string

    @Column()
    num_creditos: number

    @OneToMany(() => BonoEntity, bono => bono.clase)
    bonos: BonoEntity[];

    @ManyToOne(() => UsuarioEntity, usuario => usuario.clases)
    usuario: UsuarioEntity
}
