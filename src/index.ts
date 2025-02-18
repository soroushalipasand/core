import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import apiRouter from './interface/routes/api/index';
import syncDatabase from './infrastructure/connections/syncDatabase';
import './infrastructure/cron/cleanupOrdersJob'; // Import the cron job file
import './infrastructure/cron/getNewPosts'; // Import the cron job file
import { setupSiteSwagger } from './interface/swagger/Site/Siteswagger'; // Site Swagger Setup
import { setupAdminSwagger } from './interface/swagger/Admin/Adminswagger'; // Admin Swagger Setup

// Load environment variables
dotenv.config();

const app = express();

// Rate limiter setup
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Request limit
  keyGenerator: (req: Request): string => req.ip || 'unknown',
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      data: 'تعداد تلاش های شما بیشتر از حد مجاز بوده و دسترسی شما یرای مدت 15 دقیقه قطع میباشد.',
      success: false,
    });
  },
});

// Setup Swagger for Site API
setupSiteSwagger(app);

// Setup Swagger for Admin API
setupAdminSwagger(app);
// Middleware
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(limiter);

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3030'];

app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin as string;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type,authorization',
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use('/public', express.static('public'));
app.use('/api', apiRouter);
console.log(new Date().toString());
// Start server
const startServer = async (): Promise<void> => {
  console.log('Starting server...');
  try {
    await syncDatabase(); // Ensure database is synced
    const PORT: string | number = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('🔴 Error starting server:', (error as Error).message);
    console.error('Full error details:', error);
  }
};

startServer();
