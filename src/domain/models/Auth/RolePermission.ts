import { OriginalPermission } from 'global'; // Adjust to your path

export default class RolePermissionClass {
    id: string;
    roleId: string;
    permissionId: string;
    permission?: OriginalPermission; // Make permission optional

    constructor(id: string, roleId: string, permissionId: string, permission?: OriginalPermission) {
        this.id = id;
        this.roleId = roleId;
        this.permissionId = permissionId;
        this.permission = permission;
    }
}
