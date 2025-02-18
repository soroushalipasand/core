// src/domain/models/Blog/Post.ts
export default class Post {
  id: string;
  wpId: number;
  title: string;
  description: string;
  link: string;
  active: boolean;
  featuredImage?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  constructor(
    id: string,
    wpId: number,
    title: string,
    description: string,
    link: string,
    active: boolean,
    featuredImage: string,
  ) {
    this.id = id;
    this.wpId = wpId;
    this.title = title;
    this.description = description;
    this.link = link;
    this.active = active;
    this.featuredImage = featuredImage;
  }
}
