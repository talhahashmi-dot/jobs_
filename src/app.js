import express from "express";
import { logger } from "./utils/logger.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { swaggerUiMiddleware, swaggerUiSetup } from "./config/swagger.js";


const app = express();

app.use(express.json());
app.use(logger);

// Swagger
app.use("/api-docs", swaggerUiMiddleware, swaggerUiSetup);


// Routes
app.use("/auth", authRoutes);
app.use("/jobs", jobRoutes);

// Error Handler
app.use(errorHandler);

export default app;
