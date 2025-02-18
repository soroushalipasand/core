import { Router, Request, Response } from 'express';
import {
  checkMobileNumber,
  loginRegisterOtp,
} from '../../../../controllers/Auth/AuthController'; // Import the controller

import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Request limit
  keyGenerator: (req: Request): string => req.ip || 'unknown',
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      data: 'تعداد تلاش های شما بیشتر از حد مجاز بوده  ودسترسی شما یرای مدت 15 دقیقه قطع میباشد.',
      success: false,
    });
  },
});

const router = Router();
router.post('/checkmobile', limiter, checkMobileNumber);
router.post('/loginregisterotp', loginRegisterOtp);
export default router;
