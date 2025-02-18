// src/infrastructure/prisma/PrismaProductVariantRepository.ts
import { PrismaClient } from '@prisma/client';
import ProductVariantRepository from '../../domain/repositories/ProductVariantRepository';
import ProductVariant from '../../domain/models/Product/ProductVariant';

const prisma = new PrismaClient();

export default class PrismaProductVariantRepository
  implements ProductVariantRepository
{
  async findAll(
    page: number,
    pageSize: number,
  ): Promise<{
    variants: ProductVariant[];
    total: number;
  }> {
    const [variants, total] = await prisma.$transaction([
      prisma.productVariant.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          Inventory: true,
          size: true,
          color: true,
          discounts: true,
          product: true,
        },
      }),
      prisma.productVariant.count(),
    ]);

    return {
      variants: variants.map(
        (variant) =>
          new ProductVariant(
            variant.id,
            variant.productId,
            variant.sizeId,
            variant.colorId,
            variant.price,
            variant.sku,
            variant.size || null, // Fallback to null if size is undefined
            variant.color || null, // Fallback to null if color is undefined
            variant.product,
            [],
            variant.Inventory || undefined,
          ),
      ),
      total,
    };
  }

  async create(variant: ProductVariant): Promise<ProductVariant> {
    console.log(variant);

    const created = await prisma.productVariant.create({
      data: {
        productId: variant.productId,
        sizeId: variant.sizeId,
        colorId: variant.colorId,
        price: variant.price,
        sku: variant.sku,
      },
    });
    return new ProductVariant(
      created.id,
      created.productId,
      created.sizeId,
      created.colorId,
      created.price,
      created.sku,
    );
  }

  async update(id: string, variant: ProductVariant): Promise<ProductVariant> {
    const updated = await prisma.productVariant.update({
      where: { id },
      data: {
        productId: variant.productId,
        sizeId: variant.sizeId,
        colorId: variant.colorId,
        price: variant.price,
      },
    });
    return new ProductVariant(
      updated.id,
      updated.productId,
      updated.sizeId,
      updated.colorId,
      updated.price,
      updated.sku,
    );
  }

  async delete(id: string): Promise<void> {
    await prisma.productVariant.delete({
      where: { id },
    });
  }
}
