import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class GetEstimateDto {
  @ApiProperty()
  @IsString()
  make: string;

  @ApiProperty()
  @IsString()
  model: string;

  @ApiProperty({ minimum: 1930, maximum: 2050 })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @ApiProperty({ minimum: 0, maximum: 1000000 })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @ApiProperty()
  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  lng: number;

  @ApiProperty()
  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  lat: number;
}
