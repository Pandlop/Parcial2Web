/* eslint-disable prettier/prettier */

import { BonoEntity } from "../../bono/bono.entity/bono.entity";
import { ClaseEntity } from "../../clase/clase.entity/clase.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UsuarioEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number

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

    @Column({ nullable: true })
    jefe: number

    @OneToMany(() => BonoEntity, bono => bono.usuario)
    bonos: BonoEntity[];

    @OneToMany(() => ClaseEntity, clase => clase.usuario)
    clases: ClaseEntity[];
}
