import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { VendorModule } from './vendor/vendor.module';
import { EquipmentModule } from './equipment/equipment.module';
import { PrismaService } from './prisma/prisma.service';
import { PaymentsModule } from './payment/payment.module';

@Module({
  imports: [UserModule, ProjectModule, PaymentsModule, VendorModule, EquipmentModule],
  providers: [PrismaService],
})
export class AppModule {}
