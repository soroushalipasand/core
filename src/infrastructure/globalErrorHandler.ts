import { Response } from 'express';
import { Prisma } from '@prisma/client';

export const prismaErrorHandler = (error: unknown, res: Response): Response => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002': // Unique constraint violation
        return res.status(400).json({
          message: 'عملیات به دلیل نقض محدودیت یکتایی قابل انجام نیست.',
          success: false,
        });

      case 'P2003': // Foreign key constraint failed
        return res.status(400).json({
          message: 'عملیات به دلیل نقض محدودیت کلید خارجی قابل انجام نیست.',
          success: false,
        });

      case 'P2025': // Record not found
        return res.status(404).json({
          message: 'رکورد مورد نظر یافت نشد.',
          success: false,
        });

      default:
        return res.status(500).json({
          message: 'خطای پایگاه داده رخ داده است.',
          success: false,
        });
    }
  }

  // Handle other unexpected errors
  return res.status(500).json({
    message: 'یک خطای غیرمنتظره رخ داده است.',
    success: false,
  });
};
