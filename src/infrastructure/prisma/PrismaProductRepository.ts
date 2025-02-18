import { PrismaClient } from '@prisma/client';
import ProductRepository from '../../domain/repositories/ProductRepository';
import Product from '../../domain/models/Product/Product';
// import ProductVariant from '../../domain/models/Product/ProductVariant';

const prisma = new PrismaClient();

export default class PrismaProductRepository implements ProductRepository {
  async findAll(
    page: number,
    pageSize: number,
    categoryTitle?: string,
  ): Promise<{ products: Product[]; total: number }> {
    const whereCondition = categoryTitle
      ? {
          categories: {
            some: {
              category: {
                title: categoryTitle, // فیلتر براساس عنوان دسته‌بندی
              },
            },
          },
        }
      : undefined;

    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        where: whereCondition,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        // اگر عنوان دسته‌بندی وجود نداشت، شرطی اعمال نمی‌شود
        include: {
          categories: {
            include: {
              category: true, // اضافه کردن اطلاعات دسته‌بندی‌ها
            },
          },
        },
      }),
      prisma.product.count({
        where: whereCondition, // شرط یکسان با فیلتر محصولات
      }),
    ]);

    return {
      products: products.map((product) => {
        const categories = product.categories.map((cat) => cat.category);
        return new Product(
          product.id,
          product.name,
          product.description,
          product.price,
          product.sku,
          product.slug,
          product.active,
          product.imageUrl,
          product.imageUrls,
          categories, // پاس دادن دسته‌بندی‌ها
        );
      }),
      total,
    };
  }

  async create(product: Product): Promise<Product> {
    console.log(product);

    const createdProduct = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        sku: product.sku,
        slug: product.slug,
        active: product.active,
        // imageUrls: product.imageUrls,
      },
    });
    return new Product(
      createdProduct.id,
      createdProduct.name,
      createdProduct.description,
      createdProduct.price,
      createdProduct.sku,
      createdProduct.slug,
      createdProduct.active,
    );
  }

  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        variants: {
          include: {
            Inventory: true, // Include related inventory data
          },
        },
      },
    });

    if (!product) return null;
    console.log(product);

    return new Product(
      product.id,
      product.name,
      product.description,
      product.price,
      product.sku,
      product.slug,
      product.active,
      product.imageUrl,
      product.imageUrls,
      [], // If categories are not needed, pass an empty array
      product.variants.map((variant) => ({
        ...variant,
        Inventory: variant.Inventory ? { ...variant.Inventory } : undefined,
      })),
    );
  }

  async update(id: string, updateData: Partial<Product>): Promise<Product> {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: updateData.name,
        description: updateData.description,
        price: updateData.price,
        sku: updateData.sku,
        slug: updateData.slug,
        active: updateData.active,
      },
    });

    return new Product(
      updatedProduct.id,
      updatedProduct.name,
      updatedProduct.description,
      updatedProduct.price,
      updatedProduct.sku,
      updatedProduct.slug,
      updatedProduct.active,
      updatedProduct.imageUrl,
      updatedProduct.imageUrls,
    );
  }

  async updateMainImage(id: string, imageUrl: string): Promise<Product> {
    const updatedProduct = await prisma.product.update({
      where: { id: id },
      data: {
        imageUrl: imageUrl,
      },
    });
    return new Product(
      updatedProduct.id,
      updatedProduct.name,
      updatedProduct.description,
      updatedProduct.price,
      updatedProduct.sku,
      updatedProduct.slug,
      updatedProduct.active,
      updatedProduct.imageUrl,
      updatedProduct.imageUrls,
    );
  }
  async addGalleryImage(id: string, imageUrl: string): Promise<Product> {
    const updatedProduct = await prisma.product.update({
      where: { id: id },
      data: {
        imageUrls: {
          push: imageUrl, // URL jadid ro ezafe mikone
        },
      },
    });
    return new Product(
      updatedProduct.id,
      updatedProduct.name,
      updatedProduct.description,
      updatedProduct.price,
      updatedProduct.sku,
      updatedProduct.slug,
      updatedProduct.active,
      updatedProduct.imageUrl,
      updatedProduct.imageUrls,
    );
  }

  async editGalleryImage(id: string, imageUrls: string[]): Promise<Product> {
    const updatedProduct = await prisma.product.update({
      where: { id: id },
      data: {
        imageUrls: imageUrls,
      },
    });
    return new Product(
      updatedProduct.id,
      updatedProduct.name,
      updatedProduct.description,
      updatedProduct.price,
      updatedProduct.sku,
      updatedProduct.slug,
      updatedProduct.active,
      updatedProduct.imageUrl,
      updatedProduct.imageUrls,
    );
  }
  async deleteProduct(id: string): Promise<void> {
    await prisma.product.delete({
      where: { id },
    });
  }
}
