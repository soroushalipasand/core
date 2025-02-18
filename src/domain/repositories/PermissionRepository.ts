// src/domain/repositories/PermissionRepository.ts
import Permission from '../models/Auth/Permission';

export default interface PermissionRepository {
  findById(id: string): Promise<Permission | null>;
  create(permission: Permission): Promise<Permission>;
  update(id: string, permission: Permission): Promise<Permission>;
  delete(id: string): Promise<void>;
  getAll(
    page: number,
    pageSize: number,
  ): Promise<{ permissions: Permission[]; total: number }>;
}
