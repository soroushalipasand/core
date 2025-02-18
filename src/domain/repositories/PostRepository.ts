// src/domain/repositories/CategoryRepository.ts
import Post from '../models/Blog/Post';

export default interface PostRepository {
  findAll(
    page: number,
    pageSize: number,
  ): Promise<{ posts: Post[]; total: number }>;
  findById(id: string): Promise<Post | null>;
  create(post: Post): Promise<Post>;
  update(post: Post): Promise<Post>;
  delete(id: string): Promise<void>;
}
