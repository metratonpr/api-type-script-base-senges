import express from "express";
import helmet from "helmet";
import cors from "cors";
import { AppDataSource } from "./config/ormconfig";
import userRoutes from "./routes/userRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middlewares de segurança
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/users", userRoutes);

// Swagger setup
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Agenda API",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.ts"],
});
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Iniciando a conexão e o servidor
AppDataSource.initialize()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => console.log(error));
