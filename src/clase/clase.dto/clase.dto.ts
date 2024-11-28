/* eslint-disable prettier/prettier */

import { IsString, IsNotEmpty, IsNumber } from "class-validator"

export class ClaseDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string

    @IsString()
    @IsNotEmpty()
    readonly codigo: string

    @IsNumber()
    @IsNotEmpty()
    readonly num_creditos: number
}
