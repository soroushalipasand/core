import { Request, Response } from 'express';
import PrismaRolePermissionRepository from '../../../infrastructure/prisma/PrismaRolePermissionRepository';
import RolePermissionService from '../../../domain/services/RolePermissionService';

const repository = new PrismaRolePermissionRepository();
const service = new RolePermissionService(repository);

export const addPermissionToRole = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  // const { roleId } = req.params;
  const { roleId, permissionId } = req.body;

  try {
    await service.addPermissionToRole(roleId, permissionId);
    return res
      .status(200)
      .json({ message: 'Permission added successfully.', success: true });
  } catch (error: unknown) {
    // Define the error type as `unknown`
    // Check if the error is an instance of Error
    if (error instanceof Error) {
      return res
        .status(400)
        .json({ message: error.message || 'Error occurred.', success: false });
    }
    // In case it's not an instance of Error, you can handle other types of errors here
    return res
      .status(400)
      .json({ message: 'An unknown error occurred.', success: false });
  }
};

export const updatePermissionsForRole = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  // const { roleId } = req.params;
  const { roleId, permissionIds } = req.body;

  try {
    await service.updatePermissionsForRole(roleId, permissionIds);
    return res
      .status(200)
      .json({ message: 'Permissions updated successfully.', success: true });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res
        .status(400)
        .json({ message: error.message || 'Error occurred.', success: false });
    }
    return res
      .status(400)
      .json({ message: 'An unknown error occurred.', success: false });
  }
};

export const deletePermissionFromRole = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { roleId, permissionId } = req.body;

  try {
    await service.deletePermissionFromRole(roleId, permissionId);
    return res
      .status(200)
      .json({ message: 'Permission removed successfully.', success: true });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res
        .status(400)
        .json({ message: error.message || 'Error occurred.', success: false });
    }
    return res
      .status(400)
      .json({ message: 'An unknown error occurred.', success: false });
  }
};
const RolePermissionController = {
  addPermissionToRole,
  updatePermissionsForRole,
  deletePermissionFromRole,
};

export default RolePermissionController;
