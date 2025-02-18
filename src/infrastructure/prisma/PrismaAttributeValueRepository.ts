// src/infrastructure/prisma/PrismaAttributeValueRepository.ts
import { PrismaClient } from '@prisma/client';
import AttributeValueRepository from '../../domain/repositories/AttributeValueRepository';
import AttributeValue from '../../domain/models/Product/AttributeValue';

const prisma = new PrismaClient();

export default class PrismaAttributeValueRepository
  implements AttributeValueRepository
{
  async getAll(
    page: number,
    pageSize: number,
    attributeTitle?: string,
  ): Promise<{ attributeValues: AttributeValue[]; total: number }> {
    const whereCondition = attributeTitle
      ? { attribute: { title: attributeTitle } }
      : {};
    const [attributeValues, total] = await prisma.$transaction([
      prisma.attributeValue.findMany({
        where: whereCondition,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          attribute: true,
        },
      }),
      prisma.attributeValue.count(),
    ]);

    return {
      attributeValues: attributeValues.map(
        (attrVal) =>
          new AttributeValue(
            attrVal.id,
            attrVal.value,
            attrVal.attributeId,
            attrVal.attribute,
          ),
      ),
      total,
    };
  }

  async create(attributeValue: AttributeValue): Promise<AttributeValue> {
    // Do NOT pass the 'id' in the data, Prisma will auto-generate it.
    const created = await prisma.attributeValue.create({
      data: {
        value: attributeValue.value,
        attributeId: attributeValue.attributeId,
      },
    });
    return new AttributeValue(created.id, created.value, created.attributeId); // Return the created record with auto-generated ID
  }

  async update(
    id: string,
    attributeValue: AttributeValue,
  ): Promise<AttributeValue> {
    const updated = await prisma.attributeValue.update({
      where: { id },
      data: {
        value: attributeValue.value,
        attributeId: attributeValue.attributeId,
      },
    });
    return new AttributeValue(updated.id, updated.value, updated.attributeId);
  }

  async delete(id: string): Promise<void> {
    await prisma.attributeValue.delete({
      where: { id },
    });
  }

  async findById(id: string): Promise<AttributeValue | null> {
    const found = await prisma.attributeValue.findUnique({
      where: { id },
    });
    return found
      ? new AttributeValue(found.id, found.value, found.attributeId)
      : null;
  }
}
