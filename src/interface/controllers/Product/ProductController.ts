// src/interfaces/http/controllers/ProductController.ts
import { Response, Request } from 'express';
import ProductService from '../../../domain/services/ProductService';
import PrismaProductRepository from '../../../infrastructure/prisma/PrismaProductRepository';
import { uploadToStorage } from '../../../infrastructure/services/uploadService';
import { deleteFromStorage } from '../../../infrastructure/services/deleteImageService';
import { prismaErrorHandler } from '../../../infrastructure/globalErrorHandler';

const productRepository = new PrismaProductRepository();
const productService = new ProductService(productRepository);

export const getAllProduct = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const categoryTitle = req.query.categoryTitle as string; // گرفتن query string
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const { products, total } = await productService.getAllProducts(
      page,
      pageSize,
      categoryTitle,
    ); // پاس دادن عنوان دسته‌بندی

    return res.status(200).json({
      data: {
        products,
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
      message: 'Error in retrieving products.',
      success: false,
    });
  }
};
export const getProduct = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { productId } = req.params;
    const product = await productService.getProductById(productId);
    return res.status(200).json({
      message: 'Products retrieved successfully.',
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error in retrieving products.',
      success: false,
    });
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { name, description, price, sku, slug, active } = req.body;

  try {
    const newProduct = await productService.createProduct(
      name,
      description,
      parseInt(price),
      sku,
      slug,
      active,
    );
  

    return res.status(200).json({
      message: 'مدل محصول با موفقیت ایجاد شد.',
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: 'Failed to create product.',
      success: false,
    });
  }
};

export const addProductMainImage = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { productId, previousUrl } = req.body;
  console.log(req.body.productId, req.body.previousUrl);

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
    const fileKey = `productMainImage/${productId}-${Date.now()}-${file.originalname}`;
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
    const updatedProduct = await productService.updateProductMainImage(
      productId,
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
export const addImageGallery = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { productId } = req.body;
  console.log(req.body.productId);

  const file = req.file; // Get the uploaded file

  if (!file) {
    return res.status(400).json({
      message: 'File is required.',
      success: false,
    });
  }
  try {
    const bucketName = 'rest';
    const fileKey = `productGalleryImage/${productId}-${Date.now()}-${file.originalname}`;
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
    const updatedProduct = await productService.addProductGalleryImage(
      productId,
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
export const removeImageGallery = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { productId, fileKey } = req.body;

  try {
    const product = await productService.getProductById(productId);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found.',
        success: false,
      });
    }

    const updatedImageUrls = product.imageUrls.filter(
      (url) => url !== fileKey, // URL ke mikhay hazf beshe
    );
    const updatedProduct = await productService.editProductGalleryImage(
      productId,
      updatedImageUrls,
    );

    const bucketName = 'test';

    await deleteFromStorage(bucketName, fileKey);

    

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

export const updateProduct = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { productId, name, description, price, sku, slug, active } = req.body;

  try {
    // const product = await productService.getProductById(productId);

    const updatedProduct = await productService.updateProduct(
      productId,
      name,
      description,
      parseInt(price),
      sku,
      slug,
      active,
    );

    return res.status(200).json({
      message: 'مدل محصول با موفقیت ویرایش شد.',
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    // console.error(error);
    return prismaErrorHandler(error, res);
  }
};
export const deleteProduct = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { productId } = req.body;

  try {
    const deletedProduct = await productService.deleteProduct(productId);
    console.log(deletedProduct);

    return res.status(200).json({
      message: 'مدل محصول با موفقیت حذف شد.',
      success: true,
    });
  } catch (error) {
    // console.error(error);
    return prismaErrorHandler(error, res);
  }
};

const ProductController = {
  getAllProduct,
  createProduct,
  addProductMainImage,
  addImageGallery,
};

export default ProductController;
