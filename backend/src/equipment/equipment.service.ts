import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { VendorService } from '../vendor/vendor.service';
import { Equipment } from "@prisma/client";
import { CreateNft } from '../types/nftCreationTypes';
import { createNft } from '../utilies/createNft';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectService } from '../project/project.service';
import { CreateEquipmentDto } from '../dto/equipment.dto';

@Injectable()
export class EquipmentService {
    constructor(
        private prisma: PrismaService,
        private vendorService: VendorService,
        private projectService: ProjectService,
    ) { }

    private async validateApiKey(apiKey: string): Promise<void> {
        const project = await this.projectService.getProject(apiKey);
        if (!project) {
            throw new UnauthorizedException('Invalid API key');
        }
    }

    async addEquipment(apiKey: string, data: CreateEquipmentDto): Promise<Equipment>  {
        await this.validateApiKey(apiKey);
        
        const vendor = await this.vendorService.getVendor(apiKey, data.vendorId);

        const equipmentMetadata: CreateNft = {
            equipmentName: data.equipmentName,
                description: data.description,
                sku: data.sku,
                category: data.category,
                brand: data.brand,
                oneOffPrice: data.oneOffPrice,
                installmentPrice: data.installmentPrice,
                numberOfInstallments: data.numberOfInstallments,
                currency: data.currency,
                stockQuantity: data.stockQuantity,
                isActive: data.isActive,
                images: data.images,
                weight: data.weight,
                dimensions: data.dimensions,
                image: data.images[0],
                collectionPubkey: vendor.collectionPubkey,
                wallet: vendor.wallet
        };

        const nftCreation = await createNft(equipmentMetadata)

        if (!vendor) {
            throw new NotFoundException(`Vendor with ID ${data.vendorId} not found`);
        }

        const equipment = await this.prisma.equipment.create({
            data: {
                equipmentName: data.equipmentName,
                description: data.description,
                sku: data.sku,
                category: data.category,
                brand: data.brand,
                oneOffPrice: data.oneOffPrice,
                installmentPrice: data.installmentPrice,
                numberOfInstallments: data.numberOfInstallments,
                currency: data.currency,
                stockQuantity: data.stockQuantity,
                isActive: data.isActive,
                images: data.images,
                weight: data.weight,
                dimensions: data.dimensions,
                vendorId: data.vendorId,
                insuranceId: data.insuranceId,
                assetPubkey: nftCreation.transaction,
                transaction: nftCreation.assetPubkey,
                uri: nftCreation.uri
            }
        });
        
        return equipment
    }

    async getEquipmentById(apiKey: string, equipmentId: string): Promise<Equipment> {
        await this.validateApiKey(apiKey);

        const equipment = await this.prisma.equipment.findFirst({
            where: {
                id: equipmentId,
            }
        });

        if (!equipment) {
            throw new NotFoundException(`Equipment with ID ${equipmentId} not found`);
        }

        return equipment
    }

    async getAllEquipment(apiKey: string, vendorId: string): Promise<Equipment[]> {
        await this.validateApiKey(apiKey);

        const equipment = await this.prisma.equipment.findMany({
            where: { vendorId }
        });

        return equipment;
    }

    async updateEquipment(apiKey: string, equipmentId: string, data: Partial<CreateEquipmentDto>): Promise<Equipment> {
        await this.validateApiKey(apiKey);

        const existingEquipment = await this.prisma.equipment.findUnique({
            where: { id: equipmentId }
        });

        if (!existingEquipment) {
            throw new NotFoundException(`Equipment with ID ${equipmentId} not found`);
        }

        const updatedEquipment = await this.prisma.equipment.update({
            where: { id: equipmentId },
            data
        });

        return updatedEquipment;
    }

    async deleteEquipment(apiKey: string, equipmentId: string): Promise<void> {
        await this.validateApiKey(apiKey);

        const existingEquipment = await this.prisma.equipment.findUnique({
            where: { id: equipmentId }
        });

        if (!existingEquipment) {
            throw new NotFoundException(`Equipment with ID ${equipmentId} not found`);
        }

        await this.prisma.equipment.delete({
            where: { id: equipmentId }
        });
    }
}