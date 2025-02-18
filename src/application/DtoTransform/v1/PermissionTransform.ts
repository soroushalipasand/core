import {  RolePermission, TransformedPermission } from 'global';
import Transform from '../Transform';

// Define the type for the Permission item


export default class PermissionTransform extends Transform<RolePermission,TransformedPermission> {
  transform(item: RolePermission): TransformedPermission {
    const permission = item.permission; // Extract OrginalPermission from RolePermission

    return {
      permissionId: permission.id,
      slug: permission.slug,
      permissionName: permission.title,
    };
  }
}