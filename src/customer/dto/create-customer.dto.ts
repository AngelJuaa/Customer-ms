import { Type } from "class-transformer";
import { IsEmail, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";


export class CreateCustomerDto {
@IsString()
@MinLength(3)
@MaxLength(80)
  name: string;

@IsEmail()
email:string;

@IsNumber()
@MinLength(10)
@MaxLength(10)
  phone: number;

  
@IsOptional()
  @IsString()
  @MaxLength(150)
  address?: string;

}
