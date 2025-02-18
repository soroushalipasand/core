// src/domain/services/AttributeValueService.ts
import AttributeValueRepository from '../repositories/AttributeValueRepository';
import AttributeValue from '../models/Product/AttributeValue';
import { v4 as uuidv4 } from 'uuid'; // For generating UUIDs

export default class AttributeValueService {
  constructor(private repository: AttributeValueRepository) {}

  async getAllAttributeValues(
    page: number,
    pageSize: number,
    attributeTitle?: string,
  ): Promise<{ attributeValues: AttributeValue[]; total: number }> {
    const { attributeValues, total } = await this.repository.getAll(
      page,
      pageSize,
      attributeTitle,
    );
    return {
      attributeValues,
      total,
    };
  }

  async createAttributeValue(
    value: string,
    attributeId: string,
  ): Promise<AttributeValue> {
    const attributeValue = new AttributeValue(uuidv4(), value, attributeId); // id is auto-generated
    console.log(attributeValue);

    return await this.repository.create(attributeValue);
  }

  async updateAttributeValue(
    id: string,
    value: string,
    attributeId: string,
  ): Promise<AttributeValue> {
    const attributeValue = new AttributeValue(value, attributeId, id);
    return await this.repository.update(id, attributeValue);
  }

  async deleteAttributeValue(id: string): Promise<void> {
    return await this.repository.delete(id);
  }

  async findAttributeValueById(id: string): Promise<AttributeValue | null> {
    return await this.repository.findById(id);
  }
}
