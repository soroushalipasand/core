import { OriginalRole, TransformedRole } from 'global';
import Transform from '../Transform';
import PermissionTransform from './PermissionTransform';

// Define types for Role and Permission
// interface Permission {
//   id: number;
//   title: string;
//   slug: string;
// }



export default class RoleTransform extends Transform<OriginalRole,TransformedRole> {
  transform(item: OriginalRole): TransformedRole {
    return {
      RoleId: item.id,
      roleName: item.title,
      permissions: new PermissionTransform().transformCollection(item.permissions), // No error now
    };
  }
}
