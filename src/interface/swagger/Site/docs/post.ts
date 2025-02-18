export const postDocs = {
  '/v1/post/getall': {
    get: {
      summary: 'Get All Posts',
      tags: ['Post'],
      description: 'This endpoint retrieves all available posts.',
      parameters: [
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
          description: 'Number of posts per page.',
          schema: {
            type: 'integer',
            default: 10,
          },
        },
      ],
      responses: {
        200: {
          description: 'List of posts successfully returned.',
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
                      posts: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            id: {
                              type: 'string',
                              example: '40df48ab-85a0-4b02-8a8b-e3e9c6f7ca57',
                            },
                            wpId: {
                              type: 'integer',
                              example: 2297,
                            },
                            title: {
                              type: 'string',
                              example: 'لورم ایپسوم متن ساختگی با تولید ۱۰',
                            },
                            description: {
                              type: 'string',
                              example:
                                'Donec est. Vivamus iaculis, diam eu arcu congue eleifend. Vestibulum commodo ligula ut augue. Maecenas pretium, diam id pharetra.',
                            },
                            link: {
                              type: 'string',
                              example: 'https://blog.test.com/15-2/',
                            },
                            active: {
                              type: 'boolean',
                              example: true,
                            },
                            featuredImage: {
                              type: 'string',
                              example: 'posts/2297-1737838572161.jpg',
                            },
                          },
                        },
                      },
                      total: {
                        type: 'integer',
                        example: 10,
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
                        example: 3,
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
};
