import { Module } from '@nestjs/common';
import { SolanaPayService } from './solanapay.service';
import { PaymentsService } from './payment.service';
import { PaymentsController } from './payment.controller';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, SolanaPayService, PrismaService]
})
export class PaymentsModule {}
