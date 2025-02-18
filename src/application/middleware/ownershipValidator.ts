import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { DecodedToken, TransformedPermission, User } from 'global';

declare module 'express-serve-static-core' {
  interface Request {
    user?: User; // Replace with the actual User type from your model
    permissions?: TransformedPermission[]; // Replace with your permissions structure
  }
}
export const ownershipValidator = () => {
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
            try {
              if (decodedToken.user_mobile === req.headers.usermobile) {
                next();
              } else {
                return res.status(403).json({
                  success: false,
                  message: 'شما دسترسی این عملیات را ندارید.',
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
