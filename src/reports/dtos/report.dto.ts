import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  price: number;

  @ApiProperty()
  @Expose()
  year: number;

  @ApiProperty()
  @Expose()
  lng: number;

  @ApiProperty()
  @Expose()
  lat: number;

  @ApiProperty()
  @Expose()
  make: string;

  @ApiProperty()
  @Expose()
  model: string;

  @ApiProperty()
  @Expose()
  mileage: number;

  @ApiProperty()
  @Expose()
  approved: boolean;

  @ApiProperty()
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
