import { IsDate, Max, Min } from "class-validator"
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm"
import { User } from "./user"
import { Order } from "./order"
import { Gig } from "./gig"
export enum Status {
  ACTIVE = "active",
  BANNED = "banned",
}
@Entity()
export class Review {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  comment: string

  @Column({ type: "decimal" })
  @Min(1, { message: "Rating must be at least 1" })
  @Max(5, { message: "Rating must not be more than 5" })
  rating: number

  @ManyToOne(() => User, (user) => user.review, { onDelete: "CASCADE" })
  user: User

  @ManyToOne(() => Gig, (gig) => gig.review, { onDelete: "CASCADE" })
  gig: Gig

  @Column()
  @IsDate()
  createdAt: Date
}
