import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { DecodedToken, TransformedPermission, User } from 'global';

const prisma = new PrismaClient();

// interface DecodedToken extends JwtPayload {
//   user_mobile: string;
//   User_role: {
//     permissions: TransformedPermission[]; // Adjust this to your actual permission type
//   };
// }

// Extend the Express Request interface to include user and permissions
declare module 'express-serve-static-core' {
  interface Request {
    user?: User; // Replace with the actual User type from your model
    permissions?: TransformedPermission[]; // Replace with your permissions structure
  }
}
export const authValidator = (requiredPermission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];

        jwt.verify(
          token,
          process.env.JWT_TOKEN_SECRET_CODE as string,
          async (err, decode) => {
            if (err || !decode) {
              return res.status(401).json({
                data: 'توکن کاربر منقضی شده است.',
                success: false,
              });
            }

            const decodedToken = decode as DecodedToken;

            // فقط داده‌های مورد نیاز مانند نقش و مجوزها را اضافه کنید
            try {
              const user = await prisma.user.findUnique({
                where: { mobile: decodedToken.user_mobile },
                include: {
                  role: {
                    include: {
                      permissions: {
                        include: { permission: true },
                      },
                    },
                  },
                },
              });

              if (user) {
                const userPermissions = user.role.permissions.map(
                  (permission) => permission.permission.title,
                );
                // console.log(userPermissions.includes(requiredPermission));
                // فقط داده‌های حداقلی مانند شماره موبایل یا نقش کاربر را اضافه کنید
                // req.user = { mobile: decodedToken.user_mobile };
                // req.permissions = userPermissions;

                if (!userPermissions.includes(requiredPermission)) {
                  return res.status(403).json({
                    success: false,
                    message: 'شما دسترسی این عملیات را ندارید.',
                  });
                }

                next();
              } else {
                return res.status(400).json({
                  success: false,
                  data: 'اطلاعات معتبر نمی باشد.',
                });
              }
            } catch (findError) {
              console.log(findError);
              return res.status(500).json({
                success: false,
                data: 'خطا در پیدا کردن کاربر.',
              });
            }
          },
        );
      } else {
        return res.status(403).json({
          data: 'توکن احراز هویت وارد نشده است.',
          success: false,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        data: 'خطای داخلی سرور.',
      });
    }
  };
};
