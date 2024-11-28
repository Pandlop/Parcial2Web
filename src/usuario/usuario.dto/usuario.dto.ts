/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class UsuarioDto {

    @IsNumber()
    @IsNotEmpty()
    readonly num_cedula: number

    @IsString()
    @IsNotEmpty()
    readonly nombre: string

    @IsString()
    @IsNotEmpty()
    readonly grupo_investigacion: string

    @IsNumber()
    @IsNotEmpty()
    readonly num_extension: number

    @IsString()
    @IsNotEmpty()
    readonly rol: string


}
