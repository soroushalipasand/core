// src/domain/repositories/ProductVariantRepository.ts
import ProductVariant from '../models/Product/ProductVariant';

export default interface ProductVariantRepository {
  findAll(
    page: number,
    pageSize: number,
  ): Promise<{
    variants: ProductVariant[];
    total: number;
  }>;
  create(variant: ProductVariant): Promise<ProductVariant>;
  update(id: string, variant: ProductVariant): Promise<ProductVariant>;
  delete(id: string): Promise<void>;
}
