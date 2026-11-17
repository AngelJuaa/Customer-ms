import 'dotenv/config';
import joi from 'joi';

// Variables de entorno que esta aplicacion necesita validar antes de arrancar.
interface Envars{
    PORT:number;
}

// Requiere un puerto entero dentro del rango configurado; permite otras variables
// porque, por ejemplo, la conexion de Prisma tambien se configura por entorno.
const envsShema= joi.object<Envars>({
    PORT: joi.number().integer().max(123234567).min(1).required(),
}).unknown(true);

// abortEarly:false recopila los errores disponibles en vez de detenerse en el primero.
const result = envsShema.validate(process.env,{abortEarly:false})
if (result.error) {
    // Fallar durante el arranque evita ejecutar la API con una configuracion incompleta.
    throw new Error(`config validator error: ${result.error.message}`);
}
const enVars = result.value;

// Expone la configuracion validada con nombres convenientes para el resto del codigo.
export const envs ={
    port:enVars.PORT,
}as const;