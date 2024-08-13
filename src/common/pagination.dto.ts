import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  page?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  limit?: number;
}

// tengo que transformarlo a number porque por defecto es un string
