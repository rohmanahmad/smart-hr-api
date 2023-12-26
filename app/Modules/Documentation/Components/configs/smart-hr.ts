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
    'app/Modules/Authentication/Controllers/*.yml',
    'app/Modules/UserAccounts/Controllers/*.yml',
    'app/Modules/Employee/Controllers/*.yml',
    'app/Modules/Clients/Controllers/*.yml',
    'app/Modules/Companies/Controllers/*.yml',
    'app/Modules/Departements/Controllers/*.yml',
  ],
  basePath: '/',
}

export default config
