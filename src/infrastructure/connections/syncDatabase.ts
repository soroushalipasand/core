import prisma from './dataBaseConfig'; // Ensure the correct path

const syncDatabase = async (): Promise<void> => {
    try {
        await prisma.$connect(); // Already connects via `dbconnection.ts`
        console.log('Database is connected and synced!');
    } catch (error) {
        const err = error as Error;
        console.error('🔴 Error syncing database:', err.message);
        console.error('Full error details:', err);
    }
};

export { prisma }; // Export prisma client for use in other parts of the app
export default syncDatabase;
