/* eslint-disable prettier/prettier */

import { IsString, IsNotEmpty, IsPositive } from "class-validator"

export class ClaseDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string

    @IsString()
    @IsNotEmpty()
    readonly codigo: string

    @IsPositive()
    readonly num_creditos: number
}
