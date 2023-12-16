const config = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '(V3) Ripple10 API Documentation',
      version: '3.0.0',
      description: 'Ripple10 API Documentation',
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

  apis: ['app/Modules/Authentication/**/*.yml'],
  basePath: '/',
}

export default config
