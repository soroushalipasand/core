import cron from 'node-cron';
import PrismaPostRepository from '../prisma/PrismaPostRepository'; // Adjust the path
const postRepository = new PrismaPostRepository();

// Define types for the post structure

cron.schedule('* * * * *', async () => {
  try {
    await postRepository.addNewPosts();
  } catch (error) {
    console.error('Error during cleanup job:', error);
  }
});
