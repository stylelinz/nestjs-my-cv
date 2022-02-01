import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsEmail, IsString } from 'class-validator';
export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
