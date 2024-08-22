import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { CreateProjectDto } from '../dto/project.dto';
import { UsersService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { EncryptionService } from './cription.service';

interface ProjectWithDecryptionStatus extends Project {
  decryptionStatus: 'SUCCESS' | 'FAILED';
}

@Injectable()
export class ProjectService {
    constructor (
        private user: UsersService,
        private prisma: PrismaService,
        private encryptionService: EncryptionService
    ){}

    async createProject(data: CreateProjectDto): Promise<Project> {
        const apiKey = uuidv4()
        const encryptedApiKey = this.encryptionService.encrypt(apiKey);

        const user = await this.user.getUserByEmail(data.email)
        if(!user){
            throw new Error("User is not found")
        }

        const project = await this.prisma.project.create({
            data: {
                name: data.name,
                description: data.description,
                apiKey: encryptedApiKey,
                userId: user.id
            }
        })
        return project
    }

    async getAllUserProject(email: string): Promise<ProjectWithDecryptionStatus[]> {
      const user = await this.user.getUserByEmail(email);
      if (!user) {
          throw new Error("User is not found");
      }
    
      const projects = await this.prisma.project.findMany({
          where: {
              userId: user.id
          }
      });
    
      return projects.map(project => {
          try {
              const decryptedApiKey = this.encryptionService.decrypt(project.apiKey);
              return {
                  ...project,
                  apiKey: decryptedApiKey,
                  decryptionStatus: 'SUCCESS'
              };
          } catch (error) {
              return {
                  ...project,
                  decryptionStatus: 'FAILED'
              };
          }
      });
  }

    async getProject(apiKey: string): Promise<Project>{
        try {
            const encryptedApiKey = this.encryptionService.encrypt(apiKey);

            const project = await this.prisma.project.findUnique({
                where: {
                    apiKey: encryptedApiKey
                }
            });

            if (!project) {
                throw new NotFoundException(`Project not found for API key: ${apiKey}`);
            }

            return {
                ...project,
                apiKey: this.encryptionService.decrypt(project.apiKey),
            };
        } catch (error) {
            console.error('Error in getProject:', error);
            throw error;
        }
    }
}
