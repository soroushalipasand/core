// src/infrastructure/prisma/PrismaPermissionRepository.ts
import { PrismaClient } from '@prisma/client';
import PermissionRepository from '../../domain/repositories/PermissionRepository';
import Permission from '../../domain/models/Auth/Permission';

const prisma = new PrismaClient();

export default class PrismaPermissionRepository
  implements PermissionRepository
{
  // Get all permissions
  async getAll(
    page: number,
    pageSize: number,
  ): Promise<{ permissions: Permission[]; total: number }> {
    const [permissions, total] = await prisma.$transaction([
      prisma.permission.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.permission.count(),
    ]);

    return {
      permissions: permissions.map(
        (permission) =>
          new Permission(
            permission.id,
            permission.title,
            permission.slug,
            permission.active,
          ),
      ),
      total,
    };
  }

  // Find permission by ID
  async findById(id: string): Promise<Permission | null> {
    const permission = await prisma.permission.findUnique({
      where: { id },
    });
    if (!permission) return null;
    return new Permission(
      permission.id,
      permission.title,
      permission.slug,
      permission.active,
    );
  }

  // Create a new permission
  async create(permission: Permission): Promise<Permission> {
    try {
      // Ensure that the permission object does not include the `id` field if it's auto-incremented
      const createdPermission = await prisma.permission.create({
        data: {
          title: permission.title,
          slug: permission.slug,
          active: permission.active, // Include any other necessary fields
        },
      });

      // Return the created permission with the auto-generated ID
      return new Permission(
        createdPermission.id, // ID will be generated automatically by Prisma
        createdPermission.title,
        createdPermission.slug,
        createdPermission.active,
      );
    } catch (error) {
      console.error('Caught error:', error); // Log full error details for debugging
      throw error; // Re-throw the original error for the controller to handle
    }
  }

  // Update a permission
  async update(id: string, permission: Permission): Promise<Permission> {
    const updatedPermission = await prisma.permission.update({
      where: { id },
      data: {
        title: permission.title,
        slug: permission.slug,
        active: permission.active,
      },
    });
    return new Permission(
      updatedPermission.id,
      updatedPermission.title,
      updatedPermission.slug,
      updatedPermission.active,
    );
  }

  // Delete a permission
  async delete(id: string): Promise<void> {
    console.log(id);

    await prisma.permission.delete({
      where: { id },
    });
  }
}
