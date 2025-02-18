// src/domain/repositories/CategoryRepository.ts
import Category from '../models/Product/Category';

export default interface CategoryRepository {
  findAll(
    page: number,
    pageSize: number,
  ): Promise<{ categories: Category[]; total: number }>;
  findById(id: string): Promise<Category | null>;
  create(category: Category): Promise<Category>;
  update(category: Category): Promise<Category>;
  delete(id: string): Promise<void>;
  updateImage(id: string, updateData: Partial<Category>): Promise<Category>;
}
