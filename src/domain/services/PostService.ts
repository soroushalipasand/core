// src/application/services/PostService.ts
import Post from '../models/Blog/Post';
import PostRepository from '../repositories/PostRepository';
import { v4 as uuidv4 } from 'uuid'; // For generating UUIDs

export default class PostService {
  constructor(private postRepository: PostRepository) {}

  async getAllPosts(
    page: number,
    pageSize: number,
  ): Promise<{ posts: Post[]; total: number }> {
    const { posts, total } = await this.postRepository.findAll(page, pageSize);
    return { posts, total };
  }

  async getPostById(id: string): Promise<Post | null> {
    return this.postRepository.findById(id);
  }

  async createPost(
    wpId: number,
    title: string,
    description: string,
    link: string,
    active: boolean,
    featuredImage: string,
  ): Promise<Post> {
    const post = new Post(
      uuidv4(),
      wpId,
      title,
      description,
      link,
      active,
      featuredImage,
    ); // ID is auto-generated
    return this.postRepository.create(post);
  }

  async updatePost(
    id: string,
    wpId: number,
    title: string,
    description: string,
    link: string,
    active: boolean,
    featuredImage: string,
  ): Promise<Post> {
    const post = new Post(
      id,
      wpId,
      title,
      description,
      link,
      active,
      featuredImage,
    );
    return this.postRepository.update(post);
  }

  async deletePost(id: string): Promise<void> {
    await this.postRepository.delete(id);
  }
}
