/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsPositive, IsString } from "class-validator";

export class BonoDto {
    @IsPositive()
    readonly monto: number;

    @IsPositive()
    readonly calificacion: number;

    @IsString()
    @IsNotEmpty()
    readonly palabra_clave: string;
}
