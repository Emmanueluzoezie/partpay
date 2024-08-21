import { IsEmail, IsOptional, IsString, } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsOptional()
    userAddress?: string;

    @IsString()
    @IsOptional()
    username?: string;
}