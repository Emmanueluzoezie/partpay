import { IsArray, IsBoolean, IsInt, IsNumber, IsOptional, IsPositive, IsString, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEquipmentDto {
    @IsString()
    equipmentName: string;

    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    sku?: string;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsString()
    brand?: string;

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    oneOffPrice: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    installmentPrice?: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    numberOfInstallments?: number;

    @IsString()
    currency: string;

    @IsString()
    assetPubkey: string;

    @IsString()
    uri: string;

    @IsString()
    transaction: string;

    @IsInt()
    @Min(0)
    @Type(() => Number)
    stockQuantity: number;

    @IsBoolean()
    isActive: boolean;

    @IsArray()
    @IsString({ each: true })
    images: string[];

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    weight?: number;

    @IsOptional()
    @IsString()
    dimensions?: string;

    @IsUUID()
    vendorId: string;

    @IsOptional()
    @IsUUID()
    insuranceId?: string;
}

export class GetEquipmentDto {
    @IsUUID()
    equipmentId: string;

    @IsUUID()
    vendorId: string;
}