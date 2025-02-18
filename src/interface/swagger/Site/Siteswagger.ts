import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { docs } from './docs'; // Admin-specific documentation
import { Express, Request, Response, NextFunction } from 'express';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Site API Documentation',
      version: '1.0.0',
      description: 'API Documentation for Site routes',
    },
    servers: [
      {
        url: 'https://test.test.com/api', // Admin-specific server URL
        description: 'Production Server',
      },
      {
        url: 'http://localhost:7000/api', // Site-specific server URL
        description: 'Test Server',
      },
    ],
    paths: docs.paths, // Site-specific paths
  },
  apis: [],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSiteSwagger = (app: Express): void => {
  app.use(
    '/site-api-docs',
    swaggerUi.serve,
    (...args: [Request, Response, NextFunction]) =>
      swaggerUi.setup(swaggerSpec)(...args),
  );
  console.log('📄 Site Swagger UI available at /site-api-docs');
};
