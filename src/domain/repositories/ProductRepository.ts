// src/domain/repositories/ProductRepository.ts
import Product from '../models/Product/Product';

export default interface ProductRepository {
  findAll(
    page: number,
    pageSize: number,
    categoryTitle?: string,
  ): Promise<{ products: Product[]; total: number }>;
  create(product: Product): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  update(id: string, updateData: Partial<Product>): Promise<Product>;
  updateMainImage(id: string, imageUrl: string): Promise<Product>;
  addGalleryImage(id: string, imageUrl: string): Promise<Product>;
  editGalleryImage(id: string, imageUrls: string[]): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
}
