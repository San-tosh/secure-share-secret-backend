import {
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DecryptLinkDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly token: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly passphrase: string;
}
