const config = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '(v1.x.x) SmartHR API Documentation',
      version: '1.0.0',
      description: 'SmartHR API Documentation',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },

  apis: [
    'app/Modules/Documentation/**/*.yml',
    'app/Modules/Authentication/**/*.yml',
    'app/Modules/UserAccounts/**/*.yml',
    'app/Modules/Employee/**/*.yml',
    'app/Modules/Clients/**/*.yml',
    'app/Modules/Companies/**/*.yml',
  ],
  basePath: '/',
}

export default config
