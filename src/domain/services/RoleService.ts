import RoleRepository from '../../domain/repositories/RoleRepository';
import Role from '../../domain/models/Auth/Role';
import { v4 as uuidv4 } from 'uuid'; // For generating UUIDs
export default class RoleService {
  private roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  async getAllRoles(
    page: number,
    pageSize: number,
  ): Promise<{ roles: Role[]; total: number }> {
    const { roles, total } = await this.roleRepository.findAll(page, pageSize);
    return { roles, total }; // Returning the object in the expected format
  }

  async getRoleById(id: string): Promise<Role | null> {
    return this.roleRepository.findById(id);
  }

  async createRole(title: string, slug: string | null): Promise<Role> {
    const role = new Role(uuidv4(), title, slug); // ID will be auto-generated
    return this.roleRepository.create(role);
  }

  async updateRole(
    id: string,
    data: { title: string; slug: string },
  ): Promise<Role> {
    const existingRole = await this.roleRepository.findById(id);
    if (!existingRole) throw new Error('Role not found');

    existingRole.title = data.title;
    existingRole.slug = data.slug;
    return this.roleRepository.update(existingRole);
  }

  async deleteRole(id: string): Promise<void> {
    return await this.roleRepository.delete(id);
  }
}
