// src/domain/repositories/AttributeRepository.ts
import Attribute from '../models/Product/Attribute';

export default interface AttributeRepository {
  getAll(
    page: number,
    pageSize: number,
  ): Promise<{ attributes: Attribute[]; total: number }>;
  create(attribute: Attribute): Promise<Attribute>;
  update(id: string, attribute: Attribute): Promise<Attribute>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Attribute | null>;
}
