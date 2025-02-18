// src/domain/services/AttributeService.ts
import AttributeRepository from '../repositories/AttributeRepository';
import Attribute from '../models/Product/Attribute';
import { v4 as uuidv4 } from 'uuid'; // For generating UUIDs
export default class AttributeService {
  private repository: AttributeRepository;

  constructor(repository: AttributeRepository) {
    this.repository = repository;
  }

  // Get all attributes
  async getAllAttributes(
    page: number,
    pageSize: number,
  ): Promise<{ attributes: Attribute[]; total: number }> {
    const { attributes, total } = await this.repository.getAll(page, pageSize);
    return {
      attributes,
      total,
    };
  }

  // Create an attribute
  async createAttribute(title: string, faTitle: string): Promise<Attribute> {
    const newAttribute = new Attribute(uuidv4(), title, faTitle); // 0 will be replaced by the auto-increment ID
    return this.repository.create(newAttribute);
  }

  // Update an attribute
  async updateAttribute(
    id: string,
    title: string,
    faTitle: string,
  ): Promise<Attribute> {
    const attribute = new Attribute(id, title, faTitle);
    return this.repository.update(id, attribute);
  }

  // Delete an attribute
  async deleteAttribute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
