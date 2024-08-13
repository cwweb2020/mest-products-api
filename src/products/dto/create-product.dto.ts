import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsIn,
  MinLength,
  Min,
  IsPositive,
} from 'class-validator';

// el id no viene me lo va a generar la base de datos

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @MinLength(1)
  slug: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  stock?: number = 0; // Valor predeterminado

  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @IsString()
  @IsIn(['men', 'women', 'kid', 'unisex']) // Asumiendo que solo estos valores son válidos para el género
  gender: string;
}

// me ayuda a saber como se va a ver el producto en la base de datos
// instalar el class validator npm i class-validator class-transformer
