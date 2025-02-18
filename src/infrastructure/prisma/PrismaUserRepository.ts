// src/infrastructure/prisma/PrismaUserRepository.ts
import { PrismaClient } from '@prisma/client';
import UserRepository from '../../domain/repositories/UserRepository';
import User from '../../domain/models/Auth/User';


const prisma = new PrismaClient();

export default class PrismaUserRepository implements UserRepository {
    // Method to find user by mobile
    async findByMobile(mobile: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { mobile },
            include: {
                role: true, // Include the related role (if needed)
            },
        });
        if (!user) return null;
        return new User(user.id, user.mobile, user.hasPassword, String(user.role.id)); // Convert role.id to string
    }

    // Method to create a new user
    async create(user: User): Promise<User> {
        const userCreated = await prisma.user.create({
            data: {
                mobile: user.mobile,
                hasPassword: user.hasPassword,
                role: {
                    connect: { id: user.roleId }, // Convert roleId to number
                },
            },
            include: {
                role: true, // Include the related role
            },
        });
        return new User(userCreated.id, userCreated.mobile, userCreated.hasPassword, String(userCreated.role.id)); // Convert role.id to string
    }
    async updatePassword(mobile: string, hashedPassword: string): Promise<void> {

        await prisma.user.update({
            where: { mobile },
            data: { password: hashedPassword, hasPassword: true },
        });
    }

    async findAdminByMobile(mobile: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                mobile: mobile,
                isAdmin: true
            },
            include: {
                role: {
                    include: {
                        permissions: {
                            include: { permission: true },
                        },
                    },
                },
            },

        });

        return user;  // Convert role.id to string

    }

    // You can add other methods as needed
}
