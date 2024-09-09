import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Event } from "../entities/Event";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User, Event],
    migrations: [],
    subscribers: [],
});
