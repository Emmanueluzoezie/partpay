import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findOrCreateUser(data: CreateUserDto): Promise<User> {
        let user = await this.prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });
        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    userName: data.username,
                    admin: false
                },
            });
        }
        return user;
    }

    async getUserByEmail(email: string): Promise<User | null> {

        const user = await this.prisma.user.findUnique({
            where: {
                email: email
            }
        });
    
        return user;
    }

    async getUsers(): Promise<User[]>{
        const users = await this.prisma.user.findMany()
        return users
    }  
}