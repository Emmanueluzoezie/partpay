import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { EncryptionService } from './cription.service';
import { UsersService } from 'src/user/user.service';

@Module({
  providers: [ProjectService, PrismaService, EncryptionService, UsersService],
  controllers: [ProjectController]
})
export class ProjectModule {}
