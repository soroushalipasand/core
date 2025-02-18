import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export function showValidator(req: Request, res: Response, next: NextFunction) {
    // Extract validation errors from the request
    const errors = validationResult(req);

    // Map errors to an array of error messages
    const messageResult = errors.array().map((error) => error.msg);

    // If there are validation errors, return a 400 response with the error messages
    if (messageResult.length > 0) {
        return res.status(400).json({
            messages: messageResult,
            success: false,
        });
    }

    // If no errors, proceed to the next middleware
    next();
}
