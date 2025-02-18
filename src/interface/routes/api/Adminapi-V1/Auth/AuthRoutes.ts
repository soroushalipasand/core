import { Router, Request, Response } from 'express';
import {
  adminLogin,
  updatePassword,
} from '../../../../controllers/Auth/AuthController'; // Import the controller

import rateLimit from 'express-rate-limit';
import { createUserPassword, loginSchema } from '../../../Schema/Auth';
import { showValidator } from '../../../Schema/Validator';
import { authValidator } from '../../../../../application/middleware/authValidator';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Request limit
  keyGenerator: (req: Request): string => req.ip || 'unknown',
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      message:
        'تعداد تلاش های شما بیشتر از حد مجاز بوده  ودسترسی شما یرای مدت 15 دقیقه قطع میباشد.',
      success: false,
    });
  },
});

const router = Router();

router.post('/login', limiter, loginSchema, showValidator, adminLogin);
router.post(
  '/createuserpassword',
  limiter,
  createUserPassword,
  showValidator,
  authValidator('Change_all_user'),
  updatePassword,
);

export default router;
