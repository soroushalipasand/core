import RolePermissionRepository from "../../domain/repositories/RolePermissionRepository";
import RolePermission from "../../domain/models/Auth/RolePermission";
import { v4 as uuidv4 } from 'uuid'; // For generating UUIDs

export default class RolePermissionService {
    private repository: RolePermissionRepository;

    constructor(repository: RolePermissionRepository) {
        this.repository = repository;
    }

    async addPermissionToRole(roleId: string, permissionId: string): Promise<void> {
        const existing = await this.repository.findByIds(roleId, permissionId);
        if (existing) {
            throw new Error("Permission already added to this role.");
        }


        const rolePermission = new RolePermission(uuidv4(), roleId, permissionId);
        await this.repository.add(rolePermission);
    }

    async updatePermissionsForRole(roleId: string, permissionIds: string[]): Promise<void> {
        await this.repository.update(roleId, permissionIds);
    }

    async deletePermissionFromRole(roleId: string, permissionId: string): Promise<void> {
        const existing = await this.repository.findByIds(roleId, permissionId);
        if (!existing) {
            throw new Error("RolePermission not found.");
        }

        await this.repository.delete(roleId, permissionId);
    }
}
