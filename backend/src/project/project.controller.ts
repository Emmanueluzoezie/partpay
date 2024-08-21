import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Project } from '@prisma/client';
import { ProjectService } from './project.service';
import { CreateProjectDto } from '../dto/project.dto';
import { ApiKey } from '../common/decorators/api-key.decorator';

@Controller('project')
export class ProjectController {
    constructor (private readonly projectService: ProjectService){}

    @Post()
    async addProject(@Body() data: CreateProjectDto): Promise<Project | null >{

        const project = await this.projectService.createProject(data)
        return project
    }

    @Get()
    async getProject(@ApiKey() apiKey: string):Promise<Project>{

        const projects = await this.projectService.getProject(apiKey)
        return projects
    }

    @Get("user_projects")
    async getUserProjects(@ApiKey() apiKey: string, @Query("email") email: string): Promise<any> {
        const projects = await this.projectService.getAllUserProject(apiKey, email);
        return {
            projects,
            decryptionFailures: projects.filter(p => p.decryptionStatus === 'FAILED').length
        };
    }
}
