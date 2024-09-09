import { Router } from "express";
import { createEvent, getEvents, getEventById, updateEvent, deleteEvent } from "../controllers/eventController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Middleware de autenticação para todas as rotas
router.use(authMiddleware);

// Rotas para eventos
router.post("/", createEvent);              // Criar um novo evento
router.get("/", getEvents);                // Listar todos os eventos
router.get("/:id", getEventById);          // Obter um evento específico por ID
router.put("/:id", updateEvent);          // Atualizar um evento existente
router.delete("/:id", deleteEvent);       // Excluir um evento

export default router;
