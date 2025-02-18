export const productDocs = {
  '/v1/product/getall': {
    get: {
      summary: 'Get All Products',
      tags: ['Product'],
      description: 'This endpoint retrieves all available products.',
      parameters: [
        {
          name: 'categoryTitle',
          in: 'query',
          required: false,
          description: 'Filter products by category title.',
          schema: {
            type: 'string',
          },
        },
        {
          name: 'page',
          in: 'query',
          required: false,
          description: 'Page number for pagination.',
          schema: {
            type: 'integer',
            default: 1,
          },
        },
        {
          name: 'pageSize',
          in: 'query',
          required: false,
          description: 'Number of products per page.',
          schema: {
            type: 'integer',
            default: 10,
          },
        },
      ],
      responses: {
        200: {
          description: 'List of products successfully returned.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: null,
                  },
                  success: {
                    type: 'boolean',
                    example: true,
                  },
                  data: {
                    type: 'object',
                    properties: {
                      products: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            id: {
                              type: 'string',
                              example: '3b3d20cb-0f7a-414c-9412-ca4fb474e8f8',
                            },
                            name: {
                              type: 'string',
                              example: 'Wallet',
                            },
                            description: {
                              type: 'string',
                              example: 'Wallet',
                            },
                            price: {
                              type: 'number',
                              example: 470,
                            },
                            sku: {
                              type: 'string',
                              example: 'SKU123456',
                            },
                            slug: {
                              type: 'string',
                              example: 'some-slug',
                              nullable: true,
                            },
                            active: {
                              type: 'boolean',
                              example: true,
                            },
                            imageUrl: {
                              type: 'string',
                              example:
                                'productMainImage/3b3d20cb-0f7a-414c-9412-ca4fb474e8f8-1737480610882-4.jpeg',
                            },
                            imageUrls: {
                              type: 'array',
                              items: {
                                type: 'string',
                              },
                            },
                            categories: {
                              type: 'array',
                              items: {
                                type: 'string',
                              },
                            },
                            variants: {
                              type: 'array',
                              items: {
                                type: 'string',
                              },
                            },
                            orderItems: {
                              type: 'array',
                              items: {
                                type: 'string',
                              },
                            },
                          },
                        },
                      },
                      total: {
                        type: 'integer',
                        example: 5,
                      },
                      page: {
                        type: 'integer',
                        example: 1,
                      },
                      pageSize: {
                        type: 'integer',
                        example: 4,
                      },
                      totalPages: {
                        type: 'integer',
                        example: 2,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        500: {
          description: 'Internal server error.',
        },
      },
    },
  },
  '/v1/product/get/{productId}': {
    get: {
      summary: 'Get Product by ID',
      tags: ['Product'],
      description: 'This endpoint retrieves a product by its ID.',
      parameters: [
        {
          name: 'productId',
          in: 'path',
          required: true,
          description: 'The ID of the product to retrieve',
          schema: {
            type: 'string',
            example: '3b3d20cb-0f7a-414c-9412-ca4fb474e8f8',
          },
        },
      ],
      responses: {
        200: {
          description: 'Product successfully returned.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Products retrieved successfully.',
                  },
                  success: { type: 'boolean', example: true },
                  data: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        example: '3b3d20cb-0f7a-414c-9412-ca4fb474e8f8',
                      },
                      name: { type: 'string', example: 'Wallet' },
                      description: { type: 'string', example: 'Wallet' },
                      price: { type: 'number', example: 470 },
                      sku: { type: 'string', example: 'SKU123456' },
                      imageUrl: {
                        type: 'string',
                        example: 'https://example.com/image.jpeg',
                      },
                      categories: { type: 'array', items: { type: 'string' } },
                      variants: { type: 'array', items: { type: 'string' } },
                      orderItems: { type: 'array', items: { type: 'string' } },
                    },
                  },
                },
              },
            },
          },
        },
        404: {
          description: 'Product not found.',
        },
        500: {
          description: 'Internal server error.',
        },
      },
    },
  },
};
