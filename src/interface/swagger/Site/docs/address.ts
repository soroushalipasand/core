export const addressDocs = {
  '/v1/address/create': {
    post: {
      summary: 'Create a new address',
      tags: ['Address'],
      description: 'This endpoint creates a new address for a user.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                userId: {
                  type: 'string',
                  example: '123e4567-e89b-12d3-a456-426614174000',
                },
                addressLine: { type: 'string', example: '123 Main Street' },
                city: { type: 'string', example: 'New York' },
                state: { type: 'string', example: 'NY' },
                postalCode: { type: 'string', example: '10001' },
                country: { type: 'string', example: 'USA' },
                isDefault: { type: 'boolean', example: true },
              },
              required: [
                'userId',
                'addressLine',
                'city',
                'state',
                'postalCode',
                'country',
              ],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Address created successfully.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Address created successfully.',
                  },
                  success: { type: 'boolean', example: true },
                },
              },
            },
          },
        },
        400: {
          description: 'Bad request',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'Invalid input data.' },
                  success: { type: 'boolean', example: false },
                },
              },
            },
          },
        },
      },
    },
  },
  '/v1/address/{addressId}': {
    get: {
      summary: 'Get an address by ID',
      tags: ['Address'],
      description: 'Retrieves a specific address using its ID.',
      parameters: [
        {
          name: 'addressId',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          example: 'd0d02e1e-11a2-4ad0-8445-420d980f9f75',
        },
      ],
      responses: {
        200: {
          description: 'Address retrieved successfully.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { type: 'object' },
                  message: {
                    type: 'string',
                    example: 'Address retrieved successfully.',
                  },
                  success: { type: 'boolean', example: true },
                },
              },
            },
          },
        },
        404: {
          description: 'Address not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'Address not found.' },
                  success: { type: 'boolean', example: false },
                },
              },
            },
          },
        },
      },
    },
    put: {
      summary: 'Update an address',
      tags: ['Address'],
      description: 'Updates an existing address.',
      parameters: [
        {
          name: 'addressId',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          example: 'd0d02e1e-11a2-4ad0-8445-420d980f9f75',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                userId: {
                  type: 'string',
                  example: '123e4567-e89b-12d3-a456-426614174000',
                },
                addressLine: { type: 'string', example: '456 Another St' },
                city: { type: 'string', example: 'Los Angeles' },
                state: { type: 'string', example: 'CA' },
                postalCode: { type: 'string', example: '90001' },
                country: { type: 'string', example: 'USA' },
                isDefault: { type: 'boolean', example: false },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Address updated successfully.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Address updated successfully.',
                  },
                  success: { type: 'boolean', example: true },
                },
              },
            },
          },
        },
        400: {
          description: 'Invalid request',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Failed to update address.',
                  },
                  success: { type: 'boolean', example: false },
                },
              },
            },
          },
        },
      },
    },
    delete: {
      summary: 'Delete an address',
      tags: ['Address'],
      description: 'Deletes an address by ID.',
      parameters: [
        {
          name: 'addressId',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          example: 'd0d02e1e-11a2-4ad0-8445-420d980f9f75',
        },
      ],
      responses: {
        200: {
          description: 'Address deleted successfully.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Address deleted successfully.',
                  },
                  success: { type: 'boolean', example: true },
                },
              },
            },
          },
        },
        400: {
          description: 'Invalid request',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Error deleting address.',
                  },
                  success: { type: 'boolean', example: false },
                },
              },
            },
          },
        },
      },
    },
  },
};
