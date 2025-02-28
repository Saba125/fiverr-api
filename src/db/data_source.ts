import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entities/user"
import dotenv from "dotenv"
import { Gig } from "../entities/gig"
import { Order } from "../entities/order"
import { Review } from "../entities/review"
dotenv.config()
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Gig, Order, Review],
  subscribers: [],
  migrations: [],
})
