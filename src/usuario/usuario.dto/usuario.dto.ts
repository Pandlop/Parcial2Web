/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsPositive, IsString } from "class-validator"
export class UsuarioDto {

    @IsPositive()
    readonly num_cedula: number

    @IsString()
    @IsNotEmpty()
    readonly nombre: string

    @IsString()
    @IsNotEmpty()
    readonly grupo_investigacion: string

    @IsPositive()
    readonly num_extension: number

    @IsString()
    @IsNotEmpty()
    readonly rol: string

    readonly jefe: number
}
