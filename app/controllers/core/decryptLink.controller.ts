import {
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import { AbstractController } from 'src/shared/infrastructure/controller/api/abstract.controller';
import { Response } from 'express';
import { DecryptLinkService } from 'src/core/application/services/decryptLink.service';
import { DecryptLinkDTO } from 'src/core/application/dto/request/decryptLink.dto';

@Controller('core/decrypt-link')
export class DecryptLinkController extends AbstractController {
  constructor(private service: DecryptLinkService) {
    super();
  }

  @Post()
  async generate(@Body() dto: DecryptLinkDTO, @Res() res: Response) {
    const response = await this.service.decrypt(dto);
    this.successResponse(res, 'Link decrypted successfully.', response);
  }
}
