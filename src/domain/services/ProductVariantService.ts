// src/application/services/ProductVariantService.ts
import ProductVariantRepository from '../../domain/repositories/ProductVariantRepository';
import ProductVariant from '../../domain/models/Product/ProductVariant';
import { v4 as uuidv4 } from 'uuid'; // For generating UUIDs
export default class ProductVariantService {
  constructor(private variantRepository: ProductVariantRepository) {}

  async getAllVariants(
    page: number,
    pageSize: number,
  ): Promise<{
    variants: ProductVariant[];
    total: number;
  }> {
    const { variants, total } = await this.variantRepository.findAll(
      page,
      pageSize,
    );
    return { variants, total };
  }

  async createVariant(
    data: Omit<ProductVariant, 'id'>,
  ): Promise<ProductVariant> {
    const newVariant = new ProductVariant(
      uuidv4(),
      data.productId,
      data.sizeId,
      data.colorId,
      data.price,
      data.sku,
    );

    return this.variantRepository.create(newVariant);
  }

  async updateVariant(
    id: string,
    data: Omit<ProductVariant, 'id'>,
  ): Promise<ProductVariant> {
    const updatedVariant = new ProductVariant(
      id,
      data.productId,
      data.sizeId,
      data.colorId,
      data.price,
      data.sku,
    );
    return this.variantRepository.update(id, updatedVariant);
  }

  async deleteVariant(id: string): Promise<void> {
    return this.variantRepository.delete(id);
  }
}
