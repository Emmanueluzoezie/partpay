import { IsOptional, IsString, } from "class-validator";

export class CreateProjectDto {

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    email: string;

    @IsString()
    name: string;
}