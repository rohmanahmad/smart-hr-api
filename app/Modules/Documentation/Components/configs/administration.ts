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
    'app/Modules/Documentation/**/*Specs.yml',
    'app/Modules/Authentication/AdministrationControllers/*Specs.yml',
    'app/Modules/UserAccounts/AdministrationControllers/ListSpecs.yml',
    'app/Modules/UserAccounts/AdministrationControllers/CreateSpecs.yml',
    'app/Modules/UserAccounts/AdministrationControllers/UpdateSpecs.yml',
    'app/Modules/UserAccounts/AdministrationControllers/DeleteSpecs.yml',
    'app/Modules/Clients/AdministrationControllers/ListSpecs.yml',
    'app/Modules/Clients/AdministrationControllers/CreateSpecs.yml',
    'app/Modules/Clients/AdministrationControllers/UpdateSpecs.yml',
    'app/Modules/Clients/AdministrationControllers/DeleteSpecs.yml',
    'app/Modules/Companies/AdministrationControllers/ListSpecs.yml',
    'app/Modules/Companies/AdministrationControllers/CreateSpecs.yml',
    'app/Modules/Companies/AdministrationControllers/UpdateSpecs.yml',
    'app/Modules/Companies/AdministrationControllers/DeleteSpecs.yml',
    'app/Modules/Departements/AdministrationControllers/ListSpecs.yml',
    'app/Modules/Departements/AdministrationControllers/CreateSpecs.yml',
    'app/Modules/Departements/AdministrationControllers/UpdateSpecs.yml',
    'app/Modules/Departements/AdministrationControllers/DeleteSpecs.yml',
    'app/Modules/Employee/AdministrationControllers/ListSpecs.yml',
    'app/Modules/Employee/AdministrationControllers/CreateSpecs.yml',
    'app/Modules/Employee/AdministrationControllers/UpdateSpecs.yml',
    'app/Modules/Employee/AdministrationControllers/DeleteSpecs.yml',
  ],
  basePath: '/',
}

export default config
