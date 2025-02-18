// src/infrastructure/controllers/AttributeController.ts
import { Request, Response } from 'express';
import AttributeService from '../../../domain/services/AttributeService';
import PrismaAttributeRepository from '../../../infrastructure/prisma/PrismaAttributeRepository';
import { prismaErrorHandler } from '../../../infrastructure/globalErrorHandler';
// import PrismaAttributeRepository from '../prisma/PrismaAttributeRepository';

const repository = new PrismaAttributeRepository();
const service = new AttributeService(repository);

export const getAllAttributes = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const { attributes, total } = await service.getAllAttributes(
      page,
      pageSize,
    );
    return res.status(200).json({
      data: {
        attributes,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
      message: null,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error occurred while retrieving attributes.',
      success: false,
    });
  }
};

export const createAttribute = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { title, faTitle } = req.body;
    const newAttribute = await service.createAttribute(title, faTitle);
    return res.status(200).json({
      message: 'Attribute created successfully.',
      success: true,
      data: newAttribute,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: 'Failed to create attribute.',
      success: false,
    });
  }
};

export const updateAttribute = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    // const { id } = req.params;
    const { attributeId, title, faTitle } = req.body;
    const updatedAttribute = await service.updateAttribute(
      attributeId,
      title,
      faTitle,
    );
    return res.status(200).json({
      message: 'Attribute updated successfully.',
      success: true,
      data: updatedAttribute,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: 'Failed to update attribute.',
      success: false,
    });
  }
};

export const deleteAttribute = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { attributeId } = req.body;
    await service.deleteAttribute(attributeId);
    return res.status(200).json({
      message: 'Attribute deleted successfully.',
      success: true,
    });
  } catch (error) {
    // console.error(error);
    return prismaErrorHandler(error, res);
  }
};

const AttributeController = {
  getAllAttributes,
  createAttribute,
  updateAttribute,
  deleteAttribute,
};

export default AttributeController;
