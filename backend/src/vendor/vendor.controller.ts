import { Controller, Get, Post, Put, Delete, Body, Param, ValidationPipe, NotFoundException } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { Vendor } from '@prisma/client';
import { CreateVendorDto } from '../dto/vendor.dto';
import { ApiKey } from '../common/decorators/api-key.decorator';

@Controller('vendors')
export class VendorController {
    constructor(private readonly vendorService: VendorService) {}

    @Post()
    async createVendor(
        @ApiKey() apiKey: string,
        @Body(new ValidationPipe({ whitelist: true })) createVendorDto: CreateVendorDto
    ): Promise<Vendor> {
        return this.vendorService.createVendor(apiKey, createVendorDto);
    }

    @Get()
    async getVendors(@ApiKey() apiKey: string): Promise<Vendor[]> {
        return this.vendorService.getVendors(apiKey);
    }

    @Get(':id')
    async getVendor(@ApiKey() apiKey: string, @Param('id') id: string): Promise<Vendor> {
        const vendor = await this.vendorService.getVendor(apiKey, id);
        if (!vendor) {
            throw new NotFoundException(`Vendor with ID ${id} not found`);
        }
        return vendor;
    }

    @Delete(':id')
    async deleteVendor(@ApiKey() apiKey: string, @Param('id') id: string): Promise<{ message: string }> {
        await this.vendorService.deleteVendor(apiKey, id);
        return { message: `Vendor with ID ${id} has been deleted` };
    }
}