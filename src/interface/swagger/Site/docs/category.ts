export const categoryDocs = {
  '/v1/category/getall': {
    get: {
      summary: 'Get All Categories',
      tags: ['Category'],
      description: 'This endpoint retrieves all available categories.',
      responses: {
        200: {
          description: 'List of categories successfully returned.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Categories retrieved successfully',
                  },
                  success: {
                    type: 'boolean',
                    example: true,
                  },
                  data: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: '3a6ead17-e56549-48ab-85467b-686045661afb6b',
                        },
                        name: {
                          type: 'string',
                          example: 'Shoes',
                        },
                        description: {
                          type: 'string',
                          example: 'کفش',
                        },
                        isActive: {
                          type: 'boolean',
                          example: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        500: {
          description: 'Error retrieving categories.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Error retrieving categories.',
                  },
                  success: {
                    type: 'boolean',
                    example: false,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
