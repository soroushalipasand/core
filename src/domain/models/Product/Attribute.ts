// src/domain/models/Attribute.ts
export default class Attribute {
  id: string;
  title: string;
  faTitle: string;

  constructor(id: string, title: string, faTitle: string) {
    this.id = id;
    this.title = title;
    this.faTitle = faTitle;
  }
}
