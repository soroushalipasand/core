// src/presentation/controllers/CategoryController.ts
import { Request, Response } from 'express';
import PrismaCategoryRepository from '../../../infrastructure/prisma/PrismaCategoryRepository';
import CategoryService from '../../../domain/services/CategoryService';
// import { uploadToStorage } from '../../../infrastructure/services/uploadService';
// import { deleteFromStorage } from '../../../infrastructure/services/deleteImageService';
import { prismaErrorHandler } from '../../../infrastructure/globalErrorHandler';
import { uploadToStorage } from '../../../infrastructure/services/uploadService';
import { deleteFromStorage } from '../../../infrastructure/services/deleteImageService';

const categoryService = new CategoryService(new PrismaCategoryRepository());

export const getAllCategories = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const { categories, total } = await categoryService.getAllCategories(
      page,
      pageSize,
    );
    return res.status(200).json({
      data: {
        categories,
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
      message: 'Error retrieving categories.',
      success: false,
    });
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { title, faTitle, description, isActive, parentId } = req.body;


  try {
    const newCategory = await categoryService.createCategory(
      title,
      faTitle,
      description,
      isActive,
      parentId,
    );

    return res.status(200).json({
      message: 'Category created successfully.',
      success: true,
      data: newCategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: 'Failed to create category.',
      success: false,
    });
  }
};

export const addcategoryImage = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { categoryId, previousUrl } = req.body;
  console.log(req.body.categoryId, req.body.previousUrl);

  const file = req.file; // Get the uploaded file

  if (!file) {
    return res.status(400).json({
      message: 'File is required.',
      success: false,
    });
  }
  try {
    const bucketName = 'test';
    if (previousUrl) {
      await deleteFromStorage(bucketName, previousUrl);
    }
    const fileKey = `categories/${categoryId}-${Date.now()}-${file.originalname}`;
    const uploadResult = await uploadToStorage(
      bucketName,
      fileKey,
      file.buffer,
      file.mimetype,
    );

    if (!uploadResult.success) {
      throw new Error('Failed to upload file.');
    }
    // const fileUrl = `https://${bucketName}.s3.ir-thr-at1.arvanstorage.ir/${fileKey}`;
    const updatedProduct = await categoryService.updateCategoryImage(
      categoryId,
      fileKey,
    );
    return res.status(200).json({
      message: 'Category created successfully.',
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: 'Failed to create category.',
      success: false,
    });
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id, title, faTitle, description, isActive, parentId } = req.body;

  try {

    const updatedCategory = await categoryService.updateCategory(
      id,
      title,
      faTitle,
      description,
      isActive,
      parentId,
    );
    return res.status(200).json({
      message: 'Category updated successfully.',
      success: true,
      data: updatedCategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: 'Failed to update category.',
      success: false,
    });
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { categoryId } = req.body;

  try {
    await categoryService.deleteCategory(categoryId);
    return res.status(200).json({
      message: 'Category deleted successfully.',
      success: true,
    });
  } catch (error) {
    // console.error(error);
    return prismaErrorHandler(error, res);
  }
};

const CategoryController = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default CategoryController;
