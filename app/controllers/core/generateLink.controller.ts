import { Body, Controller, Post, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { AbstractController } from "src/shared/infrastructure/controller/api/abstract.controller";
import { GenerateLinkService } from "src/core/application/services/generateLink.service";
import { GenerateLinkDTO } from "src/core/application/dto/request/generateLink.dto";
import { Response } from "express";

@Controller('core/generate-link')
export class GenerateLinkController extends AbstractController {
    constructor(private service: GenerateLinkService,) {
        super();
    }
    
  @Post()
  async generate(@Body() dto: GenerateLinkDTO,@Res() res : Response) {
      console.log(dto);
    const response = await this.service.generateLink(dto);
    this.successResponse(res,'Link generated successfully.',response)
  }
    
    
}