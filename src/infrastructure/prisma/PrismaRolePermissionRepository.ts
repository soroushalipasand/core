import { PrismaClient } from "@prisma/client";
import RolePermissionRepository from "../../domain/repositories/RolePermissionRepository";
import RolePermission from "../../domain/models/Auth/RolePermission";
import { v4 as uuidv4 } from 'uuid'; // For generating UUIDs
const prisma = new PrismaClient();

export default class PrismaRolePermissionRepository implements RolePermissionRepository {
    // Find RolePermission by roleId and permissionId
    async findByIds(roleId: string, permissionId: string): Promise<RolePermission | null> {
        const record = await prisma.rolePermission.findUnique({
            where: {
                roleId_permissionId: {
                    roleId,
                    permissionId,
                },
            },
        });

        if (!record) return null;

        // Pass undefined for permission if it's not necessary
        return new RolePermission(record.id, record.roleId, record.permissionId);
    }


    // Add a RolePermission
    async add(rolePermission: RolePermission): Promise<RolePermission> {
        const createdRecord = await prisma.rolePermission.create({
            data: {
                roleId: rolePermission.roleId,
                permissionId: rolePermission.permissionId,
            },
        });

        return new RolePermission(uuidv4(), createdRecord.roleId, createdRecord.permissionId);
    }

    // Update RolePermissions for a role (replace all permissions for a role)
    async update(roleId: string, permissionIds: string[]): Promise<void> {
        await prisma.rolePermission.deleteMany({
            where: { roleId },
        });

        const rolePermissions = permissionIds.map((permissionId) => ({
            roleId,
            permissionId,
        }));

        await prisma.rolePermission.createMany({
            data: rolePermissions,
        });
    }

    // Delete a specific RolePermission
    async delete(roleId: string, permissionId: string): Promise<void> {
        await prisma.rolePermission.delete({
            where: {
                roleId_permissionId: {
                    roleId,
                    permissionId,
                },
            },
        });
    }
}
