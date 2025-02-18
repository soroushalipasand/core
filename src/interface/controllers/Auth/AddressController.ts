// src/interface/controllers/AddressController.ts
import { Request, Response } from 'express';
import AddressService from '../../../domain/services/AddressService';
import PrismaAddressRepository from '../../../infrastructure/prisma/PrismaAddressRepository';
import { prismaErrorHandler } from '../../../infrastructure/globalErrorHandler';

const addressService = new AddressService(new PrismaAddressRepository());

// Get all addresses
export const AllAddresses = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const { addresses, total } = await addressService.getAllAddresses(
      page,
      pageSize,
    );

    return res.status(200).json({
      data: {
        addresses,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
      message: null,
      success: true,
    });
  } catch (error) {
    console.error('Error fetching addresses:', error);
    return res.status(500).json({
      message: 'An error occurred while retrieving addresses.',
      success: false,
    });
  }
};

// Create a new address
export const createAddress = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { userId, addressLine, city, state, postalCode, country, isDefault } =
      req.body;
    await addressService.createAddress(
      userId,
      addressLine,
      city,
      state,
      postalCode,
      country,
      isDefault,
    );

    return res.status(200).json({
      message: 'Address created successfully.',
      success: true,
    });
  } catch (error) {
    // console.error(error);
    return prismaErrorHandler(error, res);
  }
};

// Get address by ID
export const getAddressById = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const address = await addressService.getAddressById(req.params.addressId);
    if (!address) {
      return res.status(404).json({
        message: 'Address not found.',
        success: false,
      });
    }
    return res.status(200).json({
      data: address,
      message: null,
      success: true,
    });
  } catch (error) {
    console.error('Error fetching address:', error);
    return res.status(500).json({
      message: 'An error occurred while retrieving the address.',
      success: false,
    });
  }
};

// Update a address
export const updateAddress = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const {
      addressId,
      userId,
      addressLine,
      city,
      state,
      postalCode,
      country,
      isDefault,
    } = req.body;
    await addressService.updateAddress(
      addressId,
      userId,
      addressLine,
      city,
      state,
      postalCode,
      country,
      isDefault,
    );

    return res.status(200).json({
      message: 'Address updated successfully.',
      success: true,
    });
  } catch (error) {
    console.error('Error updating address:', error);
    return res.status(400).json({
      message: 'Failed to update address.',
      success: false,
    });
  }
};

// Delete a address
export const deleteAddress = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { addressId } = req.body;
    console.log(addressId);

    await addressService.deleteAddress(addressId);

    return res.status(200).json({
      message: 'Address deleted successfully.',
      success: true,
    });
  } catch (error) {
    // console.error(error);
    return prismaErrorHandler(error, res);
  }
};

export default {
  AllAddresses,
  createAddress,
  getAddressById,
  updateAddress,
  deleteAddress,
};
