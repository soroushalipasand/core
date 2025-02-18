// src/domain/repositories/AttributeValueRepository.ts
import AttributeValue from '../models/Product/AttributeValue';

export default interface AttributeValueRepository {
  getAll(
    page: number,
    pageSize: number,
    attributeTitle?: string,
  ): Promise<{ attributeValues: AttributeValue[]; total: number }>; // Retrieve all attribute values
  create(attributeValue: AttributeValue): Promise<AttributeValue>; // Create an attribute value
  update(id: string, attributeValue: AttributeValue): Promise<AttributeValue>; // Update an attribute value
  delete(id: string): Promise<void>; // Delete an attribute value
  findById(id: string): Promise<AttributeValue | null>; // Find an attribute value by ID
}
