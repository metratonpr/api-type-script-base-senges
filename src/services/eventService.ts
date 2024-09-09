import { getRepository } from "typeorm";
import { Event } from "../entities/Event";

export class EventService {
  private eventRepository = getRepository(Event);

  // Criar um novo evento
  async createEvent(title: string, description: string, date: Date, userId: number): Promise<Event> {
    const event = this.eventRepository.create({ title, description, date, userId });
    return this.eventRepository.save(event);
  }

  // Obter todos os eventos
  async getEvents(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  // Obter um evento por ID
  async getEventById(id: number): Promise<Event | null> {
    return this.eventRepository.findOneBy({ id });
  }

  // Atualizar um evento
  async updateEvent(id: number, title: string, description: string, date: Date, userId: number): Promise<Event | null> {
    const event = await this.getEventById(id);
    if (!event) {
      return null;
    }
    event.title = title;
    event.description = description;
    event.date = date;
    event.userId = userId;
    return this.eventRepository.save(event);
  }

  // Excluir um evento
  async deleteEvent(id: number): Promise<boolean> {
    const result = await this.eventRepository.delete(id);
    return result.affected !== 0;
  }
}
