import { ApiProperty } from '@nestjs/swagger';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReportDto {
  @ApiProperty()
  @IsString()
  make: string;

  @ApiProperty()
  @IsString()
  model: string;

  @ApiProperty({ minimum: 1930, maximum: 2050 })
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @ApiProperty({ minimum: 0, maximum: 1000000 })
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @ApiProperty({ format: 'longitude' })
  @IsLongitude()
  lng: number;

  @ApiProperty({ format: 'latitude' })
  @IsLatitude()
  lat: number;

  @ApiProperty({ minimum: 0, maximum: 1000000 })
  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;
}
