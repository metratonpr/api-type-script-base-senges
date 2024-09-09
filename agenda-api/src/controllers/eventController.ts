import { Request, Response } from "express";
import { EventService } from "../services/eventService";
import { validate } from "class-validator";
import { Event } from "../entities/Event";
import { sanitizeEvent } from "../utils/sanitize";

const eventService = new EventService();

export const createEvent = async (req: Request, res: Response) => {
  const { title, description, date } = req.body;
  const userId = req.user.id; // Assuming user ID is set in req.user by authMiddleware

  // Validate the input data
  const event = new Event();
  event.title = title;
  event.description = description;
  event.date = new Date(date);

  const errors = await validate(event);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const newEvent = await eventService.createEvent(title, description, new Date(date), userId);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await eventService.getEvents();
    res.json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const event = await eventService.getEventById(parseInt(id, 10));
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, date } = req.body;
  const userId = req.user.id; // Assuming user ID is set in req.user by authMiddleware

  // Validate the input data
  const event = new Event();
  event.title = title;
  event.description = description;
  event.date = new Date(date);

  const errors = await validate(event);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const updatedEvent = await eventService.updateEvent(parseInt(id, 10), title, description, new Date(date), userId);
    if (updatedEvent) {
      res.json(updatedEvent);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await eventService.deleteEvent(parseInt(id, 10));
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
