// src/infrastructure/prisma/PrismaCategoryRepository.ts
import { PrismaClient } from '@prisma/client';
import CategoryRepository from '../../domain/repositories/CategoryRepository';
import Category from '../../domain/models/Product/Category';

const prisma = new PrismaClient();

export default class PrismaCategoryRepository implements CategoryRepository {
  async findAll(
    page: number,
    pageSize: number,
  ): Promise<{ categories: Category[]; total: number }> {
    const [categories, total] = await prisma.$transaction([
      prisma.category.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: { parent: true },
      }),
      prisma.category.count(),
    ]);
    // console.log(categories);

    return {
      categories: categories.map(
        (category) =>
          new Category(
            category.id,
            category.title,
            category.faTitle,
            category.description,
            category.isActive,
            category.parentId,
            category.imageUrl,
            category.parent,
          ),
      ),
      total,
    };
  }

  async findById(id: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({ where: { id } });
    return category
      ? new Category(
          category.id,
          category.title,
          category.faTitle,
          category.description,
          category.isActive,
          category.parentId,
          category.imageUrl,
        )
      : null;
  }

  async create(category: Category): Promise<Category> {
    // console.log(category);

    const createdCategory = await prisma.category.create({
      data: {
        title: category.title,
        faTitle: category.faTitle,
        description: category.description,
        isActive: category.isActive,
        parentId: category.parentId,
      },
    });
    return new Category(
      createdCategory.id,
      createdCategory.title,
      createdCategory.faTitle,
      createdCategory.description,
      createdCategory.isActive,
      createdCategory.parentId,
    );
  }

  async update(category: Category): Promise<Category> {
    const updatedCategory = await prisma.category.update({
      where: { id: category.id },
      data: {
        title: category.title,
        faTitle: category.faTitle,
        description: category.description,
        isActive: category.isActive,
        parentId: category.parentId,
        imageUrl: category.imageUrl,
      },
    });
    return new Category(
      updatedCategory.id,
      updatedCategory.title,
      updatedCategory.faTitle,
      updatedCategory.description,
      updatedCategory.isActive,
      updatedCategory.parentId,
      updatedCategory.imageUrl,
    );
  }
  async updateImage(
    id: string,
    updateData: Partial<Category>,
  ): Promise<Category> {
    const updatedCategory = await prisma.category.update({
      where: { id: id },
      data: {
        title: updateData.title,
        faTitle: updateData.faTitle,
        description: updateData.description,
        isActive: updateData.isActive,
        imageUrl: updateData.imageUrl,
      },
    });
    return new Category(
      updatedCategory.id,
      updatedCategory.title,
      updatedCategory.faTitle,
      updatedCategory.description,
      updatedCategory.isActive,
      updatedCategory.imageUrl,
    );
  }

  async delete(id: string): Promise<void> {
    await prisma.category.delete({ where: { id } });
  }
}
