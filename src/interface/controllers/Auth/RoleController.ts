import { Request, Response } from 'express';
import RoleService from '../../../domain/services/RoleService';
import PrismaRoleRepository from '../../../infrastructure/prisma/PrismaRoleRepository';
import { prismaErrorHandler } from '../../../infrastructure/globalErrorHandler';

const roleService = new RoleService(new PrismaRoleRepository());

export const getAllRoles = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const { roles, total } = await roleService.getAllRoles(page, pageSize);
    return res.status(200).json({
      data: {
        roles,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
      success: true,
      message: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Failed to fetch roles.',
      success: false,
    });
  }
};

export const getRoleById = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const role = await roleService.getRoleById(req.params.roleId);
    if (!role) {
      return res.status(404).json({
        message: 'Role not found.',
        success: false,
      });
    }
    return res.status(200).json({
      data: role,
      success: true,
      message: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Failed to fetch the role.',
      success: false,
    });
  }
};

export const createRole = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { title, slug } = req.body;
    const role = await roleService.createRole(title, slug);
    return res.status(201).json({
      data: role,
      success: true,
      message: 'Role created successfully.',
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: 'Failed to create the role.',
      success: false,
    });
  }
};

export const updateRole = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const role = await roleService.updateRole(req.body.roleId, {
      title: req.body.title,
      slug: req.body.slug,
    });
    return res.status(200).json({
      data: role,
      success: true,
      message: 'Role updated successfully.',
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: 'Failed to update the role.',
      success: false,
    });
  }
};

export const deleteRole = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { roleId } = req.body;
    await roleService.deleteRole(roleId);
    return res.status(200).json({
      success: true,
      message: 'Role deleted successfully.',
    });
  } catch (error) {
    // console.error(error);
    return prismaErrorHandler(error, res);
  }
};

export default {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
