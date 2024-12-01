/* eslint-disable prettier/prettier */

import { BonoEntity } from "../../bono/bono.entity/bono.entity";
import { UsuarioEntity } from "../../usuario/usuario.entity/usuario.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ClaseEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number

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
