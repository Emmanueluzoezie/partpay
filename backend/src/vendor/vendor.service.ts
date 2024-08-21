import { Injectable, NotFoundException } from '@nestjs/common';
import { Vendor } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectService } from '../project/project.service';
import { CreateVendorDto } from '../dto/vendor.dto';
import { CreateCollection } from '../types/nftCreationTypes';
import { createCoreCollection } from '../utilies/createCollection';

@Injectable()
export class VendorService {
    constructor(
        private prisma: PrismaService,
        private projectService: ProjectService,
    ) { }

    async createVendor(apiKey: string, createVendorDto: CreateVendorDto): Promise<Vendor> {

        try {
            console.log("started...")
            const project = await this.projectService.getProject(apiKey);
            console.log("project:", project)

            if(!project){
                console.log("error getting project")
                return
            }

            const vendorMetadata: CreateCollection = {
                fullName: createVendorDto.fullName,
                shopName: createVendorDto.shopName,
                description: createVendorDto.description,
                wallet: createVendorDto.wallet,
                businessType: createVendorDto.businessType,
                image: ""
            };

            console.log("creating collections")
            const collection = await createCoreCollection(vendorMetadata)

            console.log(collection)

            const vendorData = {
                fullName: createVendorDto.fullName,
                shopName: createVendorDto.shopName,
                description: createVendorDto.description,
                wallet: createVendorDto.wallet,
                location: createVendorDto.location,
                phoneNumber: createVendorDto.phoneNumber,
                email: createVendorDto.email,
                status: createVendorDto.status,
                businessType: createVendorDto.businessType,
                socialMedia: createVendorDto.socialMedia,
                operatingHours: createVendorDto.operatingHours,
                transaction: collection.transaction,
                collectionPubkey: collection.collection.publicKey,
                uri: collection.uri,
                project: {
                    connect: { id: project.id }
                }
            };

            const vendor = await this.prisma.vendor.create({
                data: vendorData
            });
            console.log('Vendor created:', vendor.id);
            return vendor;
        } catch (error) {
            console.error('Error creating vendor:', error);
            throw error;
        }
    }

    async getVendors(apiKey: string): Promise<Vendor[]> {
        console.log('Getting vendors with API key:', apiKey);
        const project = await this.projectService.getProject(apiKey);
        console.log('Project found:', project.id);

        try {
            const vendors = await this.prisma.vendor.findMany({
                where: { projectId: project.id }
            });
            console.log('Vendors found:', vendors.length);
            return vendors;
        } catch (error) {
            console.error('Error getting vendors:', error);
            throw error;
        }
    }

    async getVendor(apiKey: string, vendorId: string): Promise<Vendor | null> {
        console.log('Getting vendor with API key:', apiKey, 'and vendor ID:', vendorId);
        const project = await this.projectService.getProject(apiKey);
        console.log('Project found:', project.id);

        try {
            const vendor = await this.prisma.vendor.findFirst({
                where: {
                    projectId: project.id,
                    id: vendorId
                }
            });
            console.log('Vendor found:', vendor?.id);
            return vendor;
        } catch (error) {
            console.error('Error getting vendor:', error);
            throw error;
        }
    }

    async deleteVendor(apiKey: string, vendorId: string): Promise<Vendor> {
        console.log('Deleting vendor with API key:', apiKey, 'and vendor ID:', vendorId);
        const project = await this.projectService.getProject(apiKey);
        console.log('Project found:', project.id);

        try {
            const vendor = await this.prisma.vendor.delete({
                where: {
                    id: vendorId,
                    projectId: project.id
                }
            });
            console.log('Vendor deleted:', vendor.id);
            return vendor;
        } catch (error) {
            console.error('Error deleting vendor:', error);
            throw error;
        }
    }
} 