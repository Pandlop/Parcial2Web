/* eslint-disable prettier/prettier */

import { IsString, IsNotEmpty, IsPositive } from "class-validator"
import { BonoDto } from "src/bono/bono.dto/bono.dto"

export class ClaseDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string

    @IsString()
    @IsNotEmpty()
    readonly codigo: string

    @IsPositive()
    readonly num_creditos: number

    readonly bonos: BonoDto[]
}
