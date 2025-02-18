// src/application/controllers/AttributeValueController.ts
import { Response, Request } from 'express';
import AttributeValueService from '../../../domain/services/AttributeValueService';
import PrismaAttributeValueRepository from '../../../infrastructure/prisma/PrismaAttributeValueRepository';
import { prismaErrorHandler } from '../../../infrastructure/globalErrorHandler';
const repository = new PrismaAttributeValueRepository();
const service = new AttributeValueService(repository);

export const getAllAttributeValues = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const attributeTitle = req.query.attributeTitle as string;
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const { attributeValues, total } = await service.getAllAttributeValues(
      page,
      pageSize,
      attributeTitle,
    );
    return res.status(200).json({
      data: {
        attributeValues,
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
      message: 'Failed to retrieve attribute values.',
      success: false,
    });
  }
};

export const createAttributeValue = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { value, attributeId } = req.body;
    const attributeValue = await service.createAttributeValue(
      value,
      attributeId,
    );
    return res.status(200).json({
      message: 'Attribute value created successfully.',
      success: true,
      data: attributeValue,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Failed to create attribute value.',
      success: false,
    });
  }
};

export const updateAttributeValue = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { value, attributeId } = req.body;
    const updatedAttributeValue = await service.updateAttributeValue(
      id,
      value,
      attributeId,
    );
    return res.status(200).json({
      message: 'Attribute value updated successfully.',
      success: true,
      data: updatedAttributeValue,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Failed to update attribute value.',
      success: false,
    });
  }
};

export const deleteAttributeValue = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { attributeValueId } = req.body;
    await service.deleteAttributeValue(attributeValueId);
    return res.status(200).json({
      message: 'Attribute value deleted successfully.',
      success: true,
    });
  } catch (error) {
    // console.error(error);
    return prismaErrorHandler(error, res);
  }
};
