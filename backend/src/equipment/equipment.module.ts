import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectService } from 'src/project/project.service';
import { UsersService } from 'src/user/user.service';
import { EncryptionService } from 'src/project/cription.service';
import { VendorService } from 'src/vendor/vendor.service';

@Module({
  providers: [EquipmentService, PrismaService, ProjectService, UsersService, EncryptionService, VendorService],
  controllers: [EquipmentController]
})
export class EquipmentModule {}
