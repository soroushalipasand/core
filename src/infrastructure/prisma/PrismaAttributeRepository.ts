// src/infrastructure/prisma/PrismaAttributeRepository.ts
import { PrismaClient } from '@prisma/client';
import Attribute from '../../domain/models/Product/Attribute';
import AttributeRepository from '../../domain/repositories/AttributeRepository';

const prisma = new PrismaClient();

export default class PrismaAttributeRepository implements AttributeRepository {
  // Get all attributes
  async getAll(
    page: number,
    pageSize: number,
  ): Promise<{ attributes: Attribute[]; total: number }> {
    const [attributes, total] = await prisma.$transaction([
      prisma.attribute.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.attribute.count(),
    ]);
    return {
      attributes: attributes.map(
        (attribute) =>
          new Attribute(attribute.id, attribute.title, attribute.faTitle),
      ),
      total,
    };
  }

  // Create a new attribute
  async create(attribute: Attribute): Promise<Attribute> {
    const created = await prisma.attribute.create({
      data: {
        title: attribute.title,
        faTitle: attribute.faTitle,
      },
    });
    return new Attribute(created.id, created.title, created.faTitle);
  }

  // Update an existing attribute
  async update(id: string, attribute: Attribute): Promise<Attribute> {
    const updated = await prisma.attribute.update({
      where: { id },
      data: {
        title: attribute.title,
        faTitle: attribute.faTitle,
      },
    });
    return new Attribute(updated.id, updated.title, updated.faTitle);
  }

  // Delete an attribute
  async delete(id: string): Promise<void> {
    await prisma.attribute.delete({
      where: { id },
    });
  }

  // Find attribute by ID
  async findById(id: string): Promise<Attribute | null> {
    const found = await prisma.attribute.findUnique({
      where: { id },
    });
    return found ? new Attribute(found.id, found.title, found.faTitle) : null;
  }
}
