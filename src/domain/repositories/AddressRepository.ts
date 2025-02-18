// src/domain/repositories/AddressRepository.ts
import Address from '../models/Auth/UserAddress';

export default interface AddressRepository {
  findById(id: string): Promise<Address | null>;
  create(address: Address): Promise<Address>;
  update(id: string, address: Address): Promise<Address>;
  delete(id: string): Promise<void>;
  getAll(
    page: number,
    pageSize: number,
  ): Promise<{ addresses: Address[]; total: number }>;
}
