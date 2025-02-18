import Role from '../models/Auth/Role';

export default interface RoleRepository {
  findAll(
    page: number,
    pageSize: number,
  ): Promise<{ roles: Role[]; total: number }>;
  findById(id: string): Promise<Role | null>;
  create(role: Role): Promise<Role>;
  update(role: Role): Promise<Role>;
  delete(id: string): Promise<void>;
}
