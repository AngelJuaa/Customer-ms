import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

// Parametros comunes de paginacion recibidos como query string.
export class paginationDTO{
    // Numero de pagina solicitado; si se omite se empieza por la primera.
    @IsPositive()
    @IsOptional()
    @Type(()=> Number)
    page:number=1;

    // Cantidad maxima de elementos por pagina; limita el tamano de la respuesta.
    @IsPositive()
    @IsOptional()
    @Type(()=> Number)
    limit:number=40;
    
}