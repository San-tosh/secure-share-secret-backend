import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TokenValidDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly token: string;
}
