// src/infrastructure/prisma/PrismaCategoryRepository.ts
import { PrismaClient } from '@prisma/client';
import PostRepository from '../../domain/repositories/PostRepository';
import Post from '../../domain/models/Blog/Post';
import axios from 'axios';
import { WordpressPost } from 'global';
import { cleanHtmlContent } from '../../infrastructure/services/cleanHtmlContent';
import { uploadToStorage } from '../../infrastructure/services/uploadService';
const prisma = new PrismaClient();

export default class PrismaPostRepository implements PostRepository {
  async findAll(
    page: number,
    pageSize: number,
  ): Promise<{ posts: Post[]; total: number }> {
    const [posts, total] = await prisma.$transaction([
      prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.post.count(),
    ]);
    return {
      posts: posts.map(
        (post) =>
          new Post(
            post.id,
            post.wpId,
            post.title,
            post.description,
            post.link,
            post.active,
            post.featuredImage ?? '',
          ),
      ),
      total,
    };
  }

  async findById(id: string): Promise<Post | null> {
    const post = await prisma.post.findUnique({ where: { id } });
    return post
      ? new Post(
          post.id,
          post.wpId,
          post.title,
          post.description,
          post.link,
          post.active,
          post.featuredImage ?? '',
        )
      : null;
  }

  // async findByWpId(wpId: number): Promise<Post | null> {
  //   const post = await prisma.post.findUnique({ where: { wpId } });
  //   return post
  //     ? new Post(
  //         post.id,
  //         post.wpId,
  //         post.title,
  //         post.description,
  //         post.link,
  //         post.active,
  //         post.featuredImage ?? '',
  //       )
  //     : null;
  // }

  async create(post: Post): Promise<Post> {
    const createdPost = await prisma.post.create({
      data: {
        wpId: post.wpId,
        title: post.title,
        description: post.description,
        link: post.link,
        active: post.active,
        featuredImage: post.featuredImage,
      },
    });
    return new Post(
      createdPost.id,
      createdPost.wpId,
      createdPost.title,
      createdPost.description,
      createdPost.link,
      createdPost.active,
      createdPost.featuredImage ?? '',
    );
  }

  async update(post: Post): Promise<Post> {
    const updatedPost = await prisma.post.update({
      where: { id: post.id },
      data: {
        wpId: post.wpId,
        title: post.title,
        description: post.description,
        link: post.link,
        active: post.active,
        featuredImage: post.featuredImage,
      },
    });
    return new Post(
      updatedPost.id,
      updatedPost.wpId,
      updatedPost.title,
      updatedPost.description,
      updatedPost.link,
      updatedPost.active,
      updatedPost.featuredImage ?? '',
    );
  }
  async delete(id: string): Promise<void> {
    await prisma.post.delete({ where: { id } });
  }

  async addNewPosts(): Promise<void> {
    console.log('Running get New Posts', new Date());
    const response = await axios.get(
      'test',
    );
    const posts: WordpressPost[] = (await response.data) as WordpressPost[]; // Type the posts variable
    for (const post of posts) {
      // Check if the post exists
      const existingPost = await prisma.post.findUnique({
        where: { wpId: post.id },
      });
      if (!existingPost) {
        // Get featured image URL (if exists)
        const featuredImage =
          post._embedded &&
          post._embedded['wp:featuredmedia'] &&
          post._embedded['wp:featuredmedia'][0]?.source_url
            ? post._embedded['wp:featuredmedia'][0].source_url
            : '';
        let uploadedImageUrl: string | null = null;

        if (featuredImage) {
          try {
            // Fetch the image as a buffer
            const imageResponse = await fetch(featuredImage);
            const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
            const bucketName = 'test';
            const fileKey = `posts/${post.id}-${Date.now()}.jpg`;
            await uploadToStorage(
              bucketName,
              fileKey,
              imageBuffer,
              imageResponse.headers.get('content-type') || 'image/jpeg',
            );
            // Generate a unique key for the image
            //  const imageKey = `images/${uuidv4()}.jpg`; // Use an appropriate extension

            // Upload to ArvanCloud Object Storage
            // const uploadResult = await s3
            //   .upload({
            //     Bucket: bucketName,
            //     Key: imageKey,
            //     Body: imageBuffer,
            //     ContentType:
            //       imageResponse.headers.get('content-type') || 'image/jpeg',
            //   })
            //   .promise();

            // Get the uploaded image URL
            uploadedImageUrl = fileKey;
            console.log(`Image uploaded to ArvanCloud: ${uploadedImageUrl}`);
          } catch (error) {
            console.error(
              `Failed to upload image for post "${post.title.rendered}":`,
              error,
            );
          }
        }
        // Create a new post in the database
        await prisma.post.create({
          data: {
            wpId: post.id,
            title: post.title.rendered,
            description: cleanHtmlContent(post.excerpt.rendered),
            link: post.link,
            active: true,
            featuredImage: uploadedImageUrl,
          },
        });

        console.log(`Post "${post.title.rendered}" added.`);
      }
    }
  }
}
