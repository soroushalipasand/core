// src/presentation/controllers/CategoryController.ts
import { Request, Response } from 'express';
import PrismaPostRepository from '../../../infrastructure/prisma/PrismaPostRepository';
import PostService from '../../../domain/services/PostService';
// import { uploadToStorage } from '../../../infrastructure/services/uploadService';
// import { deleteFromStorage } from '../../../infrastructure/services/deleteImageService';
import { prismaErrorHandler } from '../../../infrastructure/globalErrorHandler';

const postService = new PostService(new PrismaPostRepository());

export const getAllPosts = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const { posts, total } = await postService.getAllPosts(page, pageSize);
    return res.status(200).json({
      data: {
        posts,
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

export const createPost = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { wpId, title, description, link, active, featuredImage } = req.body;

  try {
    const newCategory = await postService.createPost(
      wpId,
      title,
      description,
      link,
      active,
      featuredImage,
    );

    return res.status(200).json({
      message: 'Post created successfully.',
      success: true,
      data: newCategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: 'Post to create category.',
      success: false,
    });
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id, wpId, title, description, link, active, featuredImage } =
    req.body;

  try {
    const updatedCategory = await postService.updatePost(
      id,
      wpId,
      title,
      description,
      link,
      active,
      featuredImage,
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
  const { postId } = req.body;

  try {
    await postService.deletePost(postId);
    return res.status(200).json({
      message: 'Category deleted successfully.',
      success: true,
    });
  } catch (error) {
    // console.error(error);
    return prismaErrorHandler(error, res);
  }
};
