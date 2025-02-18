// src/presentation/controllers/VariantController.ts
import { Request, Response } from 'express';
// import ProductVariantService from "../../application/services/ProductVariantService";
import PrismaProductVariantRepository from '../../../infrastructure/prisma/PrismaProductVariantRepository';
import ProductVariantService from '../../../domain/services/ProductVariantService';

const variantService = new ProductVariantService(
  new PrismaProductVariantRepository(),
);

export const getAllVariant = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const { variants, total } = await variantService.getAllVariants(
      page,
      pageSize,
    );
    return res.status(200).json({
      data: {
        variants,
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
      message: 'Failed to retrieve variants.',
      success: false,
    });
  }
};

export const createVariant = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { productId, sizeId, colorId, price, sku } = req.body;

    const newVariant = await variantService.createVariant({
      productId,
      sizeId,
      colorId,
      price,
      sku,
    });
    return res.status(201).json({
      message: 'کالا با موفقیت ایجاد گردید.',
      success: true,
      data: newVariant,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: 'Failed to create variant.',
      success: false,
    });
  }
};

export const updateVariant = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    // const {  } = req.params;
    const { variantId, productId, sizeId, colorId, price, sku } = req.body;
    const updatedVariant = await variantService.updateVariant(variantId, {
      productId,
      sizeId,
      colorId,
      price,
      sku,
    });
    return res.status(200).json({
      message: 'تغییرات با موفقیت انجام شد.',
      success: true,
      data: updatedVariant,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: 'Failed to update variant.',
      success: false,
    });
  }
};

export const deleteVariant = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { variantId } = req.body;
    await variantService.deleteVariant(variantId);
    return res.status(200).json({
      message: 'کالا با موفقیت حذف گردید.',
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: 'Failed to delete variant.',
      success: false,
    });
  }
};

const VariantController = {
  getAllVariant,
  createVariant,
  updateVariant,
  deleteVariant,
};

export default VariantController;
