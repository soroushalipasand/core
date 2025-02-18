import cron from 'node-cron';
import PrismaOrderRepository from '../prisma/PrismaOrderRepository'; // Adjust the path

const orderRepository = new PrismaOrderRepository();

cron.schedule('* * * * *', async () => {
  try {
    await orderRepository.cleanUpExpiredOrders();
  } catch (error) {
    console.error('Error during cleanup job:', error);
  }
});
