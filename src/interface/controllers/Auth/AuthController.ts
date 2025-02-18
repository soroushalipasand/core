// src/interface/controllers/AuthController.ts
import { Request, Response } from 'express';
import UserService from '../../../domain/services/UserService';
import SmsSender from '../../../infrastructure/services/SmsSender';
import PrismaUserRepository from '../../../infrastructure/prisma/PrismaUserRepository';
import { RegisterRequest } from 'global';

// Initialize dependencies
const userRepository = new PrismaUserRepository();
const smsSender = new SmsSender();
const userService = new UserService(userRepository, smsSender);

/**
 * Controller method to check the mobile number and send OTP
 * @param req Express Request object
 * @param res Express Response object
 */
export const checkMobileNumber = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { mobile } = req.body;

        // Validate input
        if (!mobile) {
            return res.status(400).json({
                message: 'Mobile number is required.',
                success: false,
            });
        }

        // Delegate logic to the domain service
        const result = await userService.checkMobileNumber(mobile);

        return res.status(200).json({
            data: result,
            message: result.isAuthenticate ? 'User exists, OTP sent.' : 'OTP sent to new user.',
            success: true,
        });
    } catch (error: unknown) {
        // Handle errors gracefully
        const err = error as Error;
        console.error('Error in checkMobileNumber:', err);
        return res.status(500).json({
            message: 'Error checking mobile number.',
            success: false,
        });
    }
};

/**
 * Controller method to handle login/register using OTP
 * @param req Express Request object
 * @param res Express Response object
 */
export const loginRegisterOtp = async (req: RegisterRequest, res: Response): Promise<Response> => {
    try {
        const { otpToken, mobile, smsCode } = req.body;

        // Validate input
        if (!otpToken || !mobile || typeof smsCode !== 'number') {
            return res.status(400).json({
                message: 'OTP token, mobile, and SMS code are required.',
                success: false,
            });
        }

        // Delegate logic to the domain service
        const result = await userService.loginRegisterOtp(otpToken, mobile, smsCode);

        return res.status(200).json({
            data: result.data,
            message: result.message,
            success: true,
        });
    } catch (error: unknown) {
        // Handle errors gracefully
        const err = error as Error;
        console.error('Error in loginRegisterOtp:', err);
        return res.status(422).json({
            message: err.message || 'Error verifying OTP.',
            success: false,
        });
    }
};

export const updatePassword = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { mobile, password } = req.body;

        // Validate input
        if (!mobile || !password) {
            return res.status(400).json({
                message: 'Mobile number and password are required.',
                success: false,
            });
        }

        // Delegate logic to the service
        await userService.updateUserPassword(mobile, password);

        return res.status(200).json({
            message: 'Password updated successfully.',
            success: true,
        });
    } catch (error: unknown) {
        const err = error as Error;
        console.error('Error in updatePassword:', err);
        return res.status(500).json({
            message: err.message || 'Error updating password.',
            success: false,
        });
    }
};


export const adminLogin = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { mobile, password } = req.body;
        const result = await userService.adminLogin(mobile, password);
        console.log(result);
        if (!result.data) {
            return res.status(400).json({
                data: null,
                message: result.message,
                success: false,
            });
        }
        return res.status(200).json({
            data: result.data,
            message: result.message,
            success: true,
        });

    } catch (error: unknown) {
        const err = error as Error;
        console.error('Error in admin login:', err);
        return res.status(500).json({
            message: err.message || 'Error updating password.',
            success: false,
        });
    }
}

