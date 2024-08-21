import { Module } from '@nestjs/common';
import { VendorController } from './vendor.controller';
import { VendorService } from './vendor.service';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectService } from '../project/project.service';
import { UsersService } from '../user/user.service';
import { EncryptionService } from 'src/project/cription.service';

@Module({
  controllers: [VendorController],
  providers: [VendorService, PrismaService, ProjectService, UsersService, EncryptionService]
})
export class VendorModule {}
