// src/domain/services/UserService.ts
import UserRepository from '../repositories/UserRepository';
import SmsSender from '../../infrastructure/services/SmsSender';
import jwt from 'jsonwebtoken';
// import User from '../models/User';
import { PrismaClient } from '@prisma/client';
import UserTransform from '../../application/DtoTransform/v1/UserTransform';
import { TransformedUser, User } from 'global';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

export default class UserService {
  constructor(
    private userRepository: UserRepository,
    private smsSender: SmsSender,
  ) {}

  async checkMobileNumber(mobile: string) {
    // Check if user exists
    const user = await this.userRepository.findByMobile(mobile);

    if (!user) {
      // Send OTP if user does not exist
      const otp = await this.smsSender.sendOtp(mobile);
      return {
        isAuthenticate: false,
        hasPassword: false,
        otpToken: otp,
      };
    }

    // if (user.hasPassword) {
    //     return {
    //         isAuthenticate: true,
    //         hasPassword: true,
    //     };
    // }
    else {
      // Send OTP if user exists but doesn't have a password
      const otp = await this.smsSender.sendOtp(mobile);
      return {
        isAuthenticate: true,
        hasPassword: false,
        otpToken: otp,
      };
    }
  }

  // New method for handling OTP verification and user login/registration
  async loginRegisterOtp(
    otpToken: string,
    mobile: string,
    smsCode: number,
  ): Promise<{ data: TransformedUser; message: string }> {
    try {
      // Verify OTP token
      const decode = jwt.verify(
        otpToken,
        process.env.SMS_SECRET_CODE as string,
      ) as { mobile: string; code: number };

      if (mobile !== decode.mobile || smsCode != decode.code) {
        throw new Error('Invalid OTP or mobile number.');
      }

      // Find user by mobile
      let user = await prisma.user.findUnique({
        where: { mobile },
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

      // If user exists, return transformed user data
      if (user) {
        return {
          data: new UserTransform().transform(user, true, true),
          message: 'User logged in successfully.',
        };
      }

      // If no user exists, create a new user
      // Check if any active role exists
      const role = await prisma.role.findFirst({
        where: { title: 'normalUser' },
      });

      let roleId: string;

      if (!role) {
        // Create a default role if no active role exists
        const defaultRole = await prisma.role.create({
          data: {
            title: 'normalUser', // You can set any default title here
            active: true,
          },
        });
        roleId = defaultRole.id;
      } else {
        roleId = role.id;
      }

      // Create the new user with the roleId
      user = await prisma.user.create({
        data: {
          mobile,
          roleId, // Assign the roleId to the new user
        },
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

      return {
        data: new UserTransform().transform(user, true, true),
        message: 'User created successfully.',
      };
    } catch (error) {
      console.error('Error in loginRegisterOtp:', error);
      throw new Error('OTP verification failed or an error occurred.');
    }
  }

  async updateUserPassword(
    mobile: string,
    password: string,
  ): Promise<{ message: string }> {
    // Validate inputs
    if (!mobile || !password) {
      throw new Error('Mobile number and password are required.');
    }

    // Find user by mobile
    const user = await this.userRepository.findByMobile(mobile);
    if (!user) {
      throw new Error('User not found.');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 14);

    // Update user in database
    await this.userRepository.updatePassword(mobile, hashedPassword);

    return { message: 'Password updated successfully.' };
  }

  async adminLogin(
    mobile: string,
    password: string,
  ): Promise<{ data: TransformedUser | null; message: string }> {
    try {
      const user = await this.userRepository.findAdminByMobile(mobile);
      if (!user || !user.password) {
        return {
          data: null,
          message: 'شما دسترسی ورود به ناحیه مدیریتی را ندارید.',
        };
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return {
          data: null,
          message: 'نام کاربری یا رمز عبور اشتباه است.',
        };
      }
      return {
        data: new UserTransform().transform(user as User, true, true),
        message: 'خوش آمدید.',
      };
    } catch (error) {
      console.error('Error in loginRegisterOtp:', error);
      throw new Error('OTP verification failed or an error occurred.');
    }
  }
}
