// src/domain/models/Category.ts
export default class Category {
  constructor(
    public id: string,
    public title: string,
    public faTitle: string,
    public description: string | null,
    public isActive: boolean,
    public parentId?: string | null,
    public imageUrl?: string | null,
    public parent?: Category | null,
    public children?: Category[],
  ) {}
}
