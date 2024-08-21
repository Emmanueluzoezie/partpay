import { IsString, IsOptional, IsBoolean, IsObject } from 'class-validator';

export class CreateVendorDto {
    @IsString()
    fullName: string;

    @IsString()
    @IsOptional()
    shopName?: string;

    @IsString()
    description: string;

    @IsString()
    wallet: string;

    @IsString()
    @IsOptional()
    location?: string;

    @IsString()
    @IsOptional()
    phoneNumber?: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsBoolean()
    status: boolean;

    @IsString()
    @IsOptional()
    businessType?: string;

    @IsObject()
    @IsOptional()
    socialMedia?: Record<string, any>;

    @IsObject()
    @IsOptional()
    operatingHours?: Record<string, any>;
}