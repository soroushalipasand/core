export const authDocs = {
  '/v1/auth/checkmobile': {
    post: {
      summary: 'Check Mobile Number',
      tags: ['Authentication'],
      description: 'Checks if a mobile number exists and sends an OTP.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                mobile: {
                  type: 'string',
                  example: '09123456789',
                },
              },
              required: ['mobile'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'OTP sent successfully.',
          content: {
            'application/json': {
              example: {
                data: {
                  isAuthenticate: true,
                  hasPassword: false,
                  otpToken:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM1MjQ1NDk1MyIsImNvZGUiOjgyNTg1MiwiaWF0IjoxNzM0NDY2NDUwLCJleHAiOjE3MzQ2MzkyNTB9.7xY7a-iy_wq_idUAxYeQT1VnZHbsOL6rutX3bqOHhkw',
                },
                message: 'User exists, OTP sent.',
                success: true,
              },
            },
          },
        },
        400: {
          description: 'Mobile number is missing.',
          content: {
            'application/json': {
              example: {
                message: 'Mobile number is required.',
                success: false,
              },
            },
          },
        },
        500: {
          description: 'Internal server error.',
          content: {
            'application/json': {
              example: {
                message: 'Error checking mobile number.',
                success: false,
              },
            },
          },
        },
      },
    },
  },
  '/v1/auth/loginregisterotp': {
    post: {
      summary: 'Login/Register using OTP',
      tags: ['Authentication'],
      description: 'Logs in or registers a user by verifying OTP.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                otpToken: { type: 'string', example: 'abc1234token' },
                mobile: { type: 'string', example: '09123456789' },
                smsCode: { type: 'number', example: 1234 },
              },
              required: ['otpToken', 'mobile', 'smsCode'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'OTP verified successfully.',
          content: {
            'application/json': {
              example: {
                data: {
                  id: '63f1d57b-b8a4-4433-be2c-2069sada51d3',
                  firstName: null,
                  lastName: null,
                  email: null,
                  mobile: '09352454953',
                  hasPassword: false,
                  role: {
                    RoleId: '154546546c6e0e-5b553-4677-bfe0-asddda6b4fa3',
                    roleName: 'normalUser',
                    permissions: [
                      {
                        permissionId:
                          '78af678798a-0d4408-4c444c4-944f2c-1776457904c24664',
                        slug: 'read',
                        permissionName: 'read',
                      },
                    ],
                  },
                  AccessToken:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX21vYmlsZSI6IjA5MzUyNDU0OTUxlIjp7IlJvbGVJZCI6IjE1NGM2ZTBlLTViMjMtNDM0Ny1iZmUwLTdlMWQ5YTZiNGZhMyIsInJvbGVOYW1lIjoibm9ybWFsVXNlciIsInBlcm1pc3Npb25zIjpbeyJpZCI6IjM5MGRiN2UwLTIxOWMtNGY0ZC1hOWE1LTk0NDE3OTAxZjhiOSIsInJvbGVJZCI6IjE1NGM2ZTBlLTViMjMtNDM0Ny1iZmUwLTdlMWQ5YTZiNGZhMyIsInBlcm1pc3Npb25JZCI6Ijc4YWZjODhhLTBkMDgtNGNjNC05ZjJjLTE3NzYwNGMyNDY2NCIsImNyZWF0ZWRBdCI6IjIwMjQtMTEtMjlUMjE6MTc6MDYuNTUyWiIsInVwZGF0ZWRBdCI6IjIwMjQtMTEtMjlUMjE6MTc6MDYuNTUyWiIsInBlcm1pc3Npb24iOnsiaWQiOiI3OGFmYzg4YS0wZDA4LTRjYzQtOWYyYy0xNzc2MDRjMjQ2NjQiLCJ0aXRsZSI6InJlYWQiLCJzbHVnIjoicmVhZCIsImFjdGl2ZSI6dHJ1ZSwiY3JlYXRlZEF0IjoiMjAyNC0xMS0yOVQyMToxNTo0Mi42NjhaIiwidXBkYXRlZEF0IjoiMjAyNC0xMS0yOVQyMToxNTo0Mi42NjhaIn19XX0sImlhdCIjoxNzM0Cn5ZHBZAt3ZdJzje9lR10Jcnew-lYHjrkU',
                  RefreshToken:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkjNmMWQ2NmItCjA2OTQyMWE1MWQzIiwiaWF0IjoxNzM0NDY2NTUzLCJleHAiOjE3MzQ3MjU3NTN9.1kWreFvJUOPl6kLlhDshL3vSy8KzQe0trUYNbEeUZUM',
                },
                message: 'User logged in successfully.',
                success: true,
              },
            },
          },
        },
        400: {
          description: 'Invalid request body.',
          content: {
            'application/json': {
              example: {
                message: 'OTP token, mobile, and SMS code are required.',
                success: false,
              },
            },
          },
        },
        422: {
          description: 'OTP verification failed.',
          content: {
            'application/json': {
              example: {
                message: 'Invalid OTP code.',
                success: false,
              },
            },
          },
        },
      },
    },
  },
};
