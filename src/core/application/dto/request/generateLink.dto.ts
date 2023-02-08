import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GenerateLinkDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly content: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly passphrase: string;
    
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    readonly expiredAt: number;
}