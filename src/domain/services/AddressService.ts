// src/domain/services/AddressService.ts
import AddressRepository from '../repositories/AddressRepository';
import Address from '../models/Auth/UserAddress';
import { v4 as uuidv4 } from 'uuid'; // For generating UUIDs

export default class AddressService {
  private addressRepo: AddressRepository;

  constructor(addressRepo: AddressRepository) {
    this.addressRepo = addressRepo;
  }

  // Get all addresses
  async getAllAddresses(
    page: number,
    pageSize: number,
  ): Promise<{ addresses: Address[]; total: number }> {
    // Ensure you're destructuring correctly here
    const { addresses, total } = await this.addressRepo.getAll(page, pageSize);
    return { addresses, total }; // Returning the object in the expected format
  }
  // Create a new address
  async createAddress(
    userId: string,
    addressLine: string,
    city: string,
    state: string,
    postalCode: string,
    country: string,
    isDefault: boolean,
  ): Promise<Address> {
    const newAddress = new Address(
      uuidv4(),
      userId,
      addressLine,
      city,
      state,
      postalCode,
      country,
      isDefault,
    ); // ID is not set for new address
    return await this.addressRepo.create(newAddress);
  }

  // Get address by ID
  async getAddressById(id: string): Promise<Address | null> {
    return await this.addressRepo.findById(id);
  }

  // Update address
  async updateAddress(
    id: string,
    userId: string,
    addressLine: string,
    city: string,
    state: string,
    postalCode: string,
    country: string,
    isDefault: boolean,
  ): Promise<Address> {
    const updatedAddress = new Address(
      id,
      userId,
      addressLine,
      city,
      state,
      postalCode,
      country,
      isDefault,
    );
    return await this.addressRepo.update(id, updatedAddress);
  }

  // Delete address
  async deleteAddress(id: string): Promise<void> {
    return await this.addressRepo.delete(id);
  }
}
