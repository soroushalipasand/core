// src/interface/controllers/PermissionController.ts
import { Request, Response } from 'express';
import PermissionService from '../../../domain/services/PermissionService';
import PrismaPermissionRepository from '../../../infrastructure/prisma/PrismaPermissionRepository';
import { prismaErrorHandler } from '../../../infrastructure/globalErrorHandler';

const permissionService = new PermissionService(
  new PrismaPermissionRepository(),
);

// Get all permissions
export const allPermissions = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const { permissions, total } = await permissionService.getAllPermissions(
      page,
      pageSize,
    );

    return res.status(200).json({
      data: {
        permissions,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
      message: null,
      success: true,
    });
  } catch (error) {
    console.error('Error fetching permissions:', error);
    return res.status(500).json({
      message: 'An error occurred while retrieving permissions.',
      success: false,
    });
  }
};

// Create a new permission
export const createPermission = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { title, slug, active } = req.body;
    await permissionService.createPermission(title, slug, active);

    return res.status(201).json({
      message: 'Permission created successfully.',
      success: true,
    });
  } catch (error) {
    // console.error(error);
    return prismaErrorHandler(error, res);
  }
};

// Get permission by ID
export const getPermissionById = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const permission = await permissionService.getPermissionById(
      req.params.permissionId,
    );
    if (!permission) {
      return res.status(404).json({
        message: 'Permission not found.',
        success: false,
      });
    }
    return res.status(200).json({
      data: permission,
      message: null,
      success: true,
    });
  } catch (error) {
    console.error('Error fetching permission:', error);
    return res.status(500).json({
      message: 'An error occurred while retrieving the permission.',
      success: false,
    });
  }
};

// Update a permission
export const updatePermission = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { permissionId, title, slug, active } = req.body;
    await permissionService.updatePermission(permissionId, title, slug, active);

    return res.status(200).json({
      message: 'Permission updated successfully.',
      success: true,
    });
  } catch (error) {
    console.error('Error updating permission:', error);
    return res.status(400).json({
      message: 'Failed to update permission.',
      success: false,
    });
  }
};

// Delete a permission
export const deletePermission = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { permissionId } = req.body;
    console.log(permissionId);

    await permissionService.deletePermission(permissionId);

    return res.status(200).json({
      message: 'Permission deleted successfully.',
      success: true,
    });
  } catch (error) {
    // console.error(error);
    return prismaErrorHandler(error, res);
  }
};

export default {
  allPermissions,
  createPermission,
  getPermissionById,
  updatePermission,
  deletePermission,
};
