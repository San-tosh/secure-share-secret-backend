import { Body, Controller, Post, Res } from '@nestjs/common';
import { AbstractController } from 'src/shared/infrastructure/controller/api/abstract.controller';
import { Response } from 'express';
import { IsTokenValidationService } from './../../../src/core/application/services/isTokenValid.service';
import { TokenValidDTO } from 'src/core/application/dto/request/tokenValid.dto';

@Controller('core/is-token-valid')
export class IsTokenValidController extends AbstractController {
  constructor(private service: IsTokenValidationService) {
    super();
  }

  @Post()
  async generate(@Body() dto: TokenValidDTO, @Res() res: Response) {
      const response = await this.service.isTokenValid(dto.token);
      this.successResponse(res, 'Token.', response);
  }
}
