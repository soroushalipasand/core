import { PrismaClient } from '@prisma/client';
import RoleRepository from '../../domain/repositories/RoleRepository';
import Role from '../../domain/models/Auth/Role';

const prisma = new PrismaClient();

export default class PrismaRoleRepository implements RoleRepository {
  async findAll(
    page: number,
    pageSize: number,
  ): Promise<{ roles: Role[]; total: number }> {
    const [roles, total] = await prisma.$transaction([
      prisma.role.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          permissions: {
            include: { permission: true }, // Ensure nested permission object is fetched
          },
        },
      }),
      prisma.role.count(),
    ]);

    // Return the correct structure
    return {
      roles: roles.map(
        (role) =>
          new Role(
            role.id,
            role.title,
            role.slug,
            role.active,
            role.permissions?.map((perm) => ({
              id: perm.id,
              roleId: perm.roleId,
              permissionId: perm.permissionId,
              permission: {
                id: perm.permission.id,
                title: perm.permission.title,
                slug: perm.permission.slug,
                active: perm.permission.active,
              },
            })),
          ),
      ),
      total,
    };
  }

  async findById(id: string): Promise<Role | null> {
    const role = await prisma.role.findUnique({
      where: { id },
      include: {
        permissions: {
          include: { permission: true },
        },
      },
    });
    if (!role) return null;

    return new Role(
      role.id,
      role.title,
      role.slug,
      role.active, // Explicitly pass the active field
      role.permissions?.map((perm) => ({
        id: perm.id,
        roleId: perm.roleId,
        permissionId: perm.permissionId,
        permission: {
          id: perm.permission.id,
          title: perm.permission.title,
          slug: perm.permission.slug,
          active: perm.permission.active, // Include all fields from OrginalPermission
        },
      })),
    );
  }

  async create(role: Role): Promise<Role> {
    const createdRole = await prisma.role.create({
      data: {
        title: role.title,
        slug: role.slug,
      },
    });
    return new Role(createdRole.id, createdRole.title, createdRole.slug);
  }

  async update(role: Role): Promise<Role> {
    const updatedRole = await prisma.role.update({
      where: { id: role.id },
      data: {
        title: role.title,
        slug: role.slug,
      },
    });
    return new Role(updatedRole.id, updatedRole.title, updatedRole.slug);
  }

  async delete(id: string): Promise<void> {
    await prisma.role.delete({ where: { id } });
  }
}
