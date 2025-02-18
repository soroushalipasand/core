// src/infrastructure/prisma/PrismaAddressRepository.ts
import { PrismaClient } from '@prisma/client';
import AddressRepository from '../../domain/repositories/AddressRepository';
import Address from '../../domain/models/Auth/UserAddress';

const prisma = new PrismaClient();

export default class PrismaAddressRepository implements AddressRepository {
  // Get all Addresses
  async getAll(
    page: number,
    pageSize: number,
  ): Promise<{ addresses: Address[]; total: number }> {
    const [Addresses, total] = await prisma.$transaction([
      prisma.userAddress.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.userAddress.count(),
    ]);

    return {
      addresses: Addresses.map(
        (address) =>
          new Address(
            address.id,
            address.userId,
            address.addressLine,
            address.city,
            address.state,
            address.postalCode,
            address.country,
            address.isDefault,
          ),
      ),
      total,
    };
  }

  // Find address by ID
  async findById(id: string): Promise<Address | null> {
    const address = await prisma.userAddress.findUnique({
      where: { id },
    });
    if (!address) return null;
    return new Address(
      address.id,
      address.userId,
      address.addressLine,
      address.city,
      address.state,
      address.postalCode,
      address.country,
      address.isDefault,
    );
  }

  // Create a new address
  async create(address: Address): Promise<Address> {
    try {
      // Ensure that the address object does not include the `id` field if it's auto-incremented
      const createdAddress = await prisma.userAddress.create({
        data: {
          userId: address.userId,
          addressLine: address.addressLine,
          city: address.city,
          state: address.state,
          postalCode: address.postalCode,
          country: address.country,
          isDefault: address.isDefault,
        },
      });

      // Return the created address with the auto-generated ID
      return new Address(
        createdAddress.id,
        createdAddress.userId,
        createdAddress.addressLine,
        createdAddress.city,
        createdAddress.state,
        createdAddress.postalCode,
        createdAddress.country,
        createdAddress.isDefault,
      );
    } catch (error) {
      console.error('Caught error:', error); // Log full error details for debugging
      throw error; // Re-throw the original error for the controller to handle
    }
  }

  // Update a address
  async update(id: string, address: Address): Promise<Address> {
    const updatedPermission = await prisma.userAddress.update({
      where: { id },
      data: {
        userId: address.userId,
        addressLine: address.addressLine,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
        isDefault: address.isDefault,
      },
    });
    return new Address(
      updatedPermission.id,
      updatedPermission.userId,
      updatedPermission.addressLine,
      updatedPermission.city,
      updatedPermission.state,
      updatedPermission.postalCode,
      updatedPermission.country,
      updatedPermission.isDefault,
    );
  }

  // Delete a address
  async delete(id: string): Promise<void> {
    console.log(id);

    await prisma.userAddress.delete({
      where: { id },
    });
  }
}
