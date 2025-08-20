import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const routesGlob = path.join(__dirname, "..", "routes", "*.js");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Jobs API",
      version: "1.0.0",
      description: "API documentation for Job posting CRUD with authentication (not included auth on get request)",
    },
    servers: [
      {
        url: "/",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [routesGlob],
};

export const swaggerSpec = swaggerJsdoc(options);
export const swaggerUiMiddleware = swaggerUi.serve;
export const swaggerUiSetup = swaggerUi.setup(swaggerSpec);
