import RolePermission from "../models/Auth/RolePermission";

export default interface RolePermissionRepository {
    findByIds(roleId: string, permissionId: string): Promise<RolePermission | null>;
    add(rolePermission: RolePermission): Promise<RolePermission>;
    update(roleId: string, permissionIds: string[]): Promise<void>;
    delete(roleId: string, permissionId: string): Promise<void>;
}
