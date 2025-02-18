// src/domain/services/PermissionService.ts
import PermissionRepository from '../repositories/PermissionRepository';
import Permission from '../models/Auth/Permission';
import { v4 as uuidv4 } from 'uuid'; // For generating UUIDs

export default class PermissionService {
  private permissionRepo: PermissionRepository;

  constructor(permissionRepo: PermissionRepository) {
    this.permissionRepo = permissionRepo;
  }

  // Get all permissions
  async getAllPermissions(
    page: number,
    pageSize: number,
  ): Promise<{ permissions: Permission[]; total: number }> {
    // Ensure you're destructuring correctly here
    const { permissions, total } = await this.permissionRepo.getAll(
      page,
      pageSize,
    );
    return { permissions, total }; // Returning the object in the expected format
  }
  // Create a new permission
  async createPermission(
    title: string,
    slug: string | null,
    active: boolean,
  ): Promise<Permission> {
    const newPermission = new Permission(uuidv4(), title, slug, active); // ID is not set for new permissions
    return await this.permissionRepo.create(newPermission);
  }

  // Get permission by ID
  async getPermissionById(id: string): Promise<Permission | null> {
    return await this.permissionRepo.findById(id);
  }

  // Update permission
  async updatePermission(
    id: string,
    title: string,
    slug: string | null,
    active: boolean,
  ): Promise<Permission> {
    const updatedPermission = new Permission(id, title, slug, active);
    return await this.permissionRepo.update(id, updatedPermission);
  }

  // Delete permission
  async deletePermission(id: string): Promise<void> {
    return await this.permissionRepo.delete(id);
  }
}
