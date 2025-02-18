// src/application/services/CategoryService.ts
import Category from '../../domain/models/Product/Category';
import CategoryRepository from '../../domain/repositories/CategoryRepository';
import { v4 as uuidv4 } from 'uuid'; // For generating UUIDs

export default class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async getAllCategories(
    page: number,
    pageSize: number,
  ): Promise<{ categories: Category[]; total: number }> {
    const { categories, total } = await this.categoryRepository.findAll(
      page,
      pageSize,
    );
    return { categories, total };
  }

  async getCategoryById(id: string): Promise<Category | null> {
    return this.categoryRepository.findById(id);
  }

  async createCategory(
    title: string,
    faTitle: string,
    description: string | null,
    isActive: boolean,
    parentId: string,
  ): Promise<Category> {
    console.log(parentId);

    const category = new Category(
      uuidv4(),
      title,
      faTitle,
      description,
      isActive,
      parentId,
    ); // ID is auto-generated
    return this.categoryRepository.create(category);
  }

  async updateCategory(
    id: string,
    title: string,
    faTitle: string,
    description: string | null,
    isActive: boolean,
    parentId: string,
  ): Promise<Category> {
    const category = new Category(
      id,
      title,
      faTitle,
      description,
      isActive,
      parentId,
    );
    return this.categoryRepository.update(category);
  }

  async deleteCategory(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
  async updateCategoryImage(
    categoryId: string,
    imageUrl: string,
  ): Promise<Category> {
    return this.categoryRepository.updateImage(categoryId, { imageUrl });
  }
}
