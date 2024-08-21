import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from './user.service';
import { CreateUserDto } from '../dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Post()
    async createUser(@Body() data: CreateUserDto): Promise<User | null>{
        const user = await this.userService.findOrCreateUser(data)
        return user
    }

    @Get('findUserByEmail')
    async getUser(@Query('email') email: string){
        const user = await this.userService.getUserByEmail(email)
        
        return user
    }
}