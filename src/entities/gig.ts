import { IsDate, IsEmail } from "class-validator"
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm"
import { User } from "./user"
import { Order } from "./order"
import { Review } from "./review"
export enum Status {
  ACTIVE = "active",
  BANNED = "banned",
}
@Entity()
export class Gig {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.gigs, { onDelete: "CASCADE" })
  sellerId: User
  @Column({ nullable: false })
  title: string
  @Column({ nullable: false })
  description: string
  @Column("text", { array: true, nullable: false })
  tags: string[]
  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number
  @Column({ nullable: false })
  category: string
  @Column({ nullable: true })
  image: string
  @Column({ type: "decimal", precision: 10, scale: 2 })
  rating: number
  @Column({ type: "enum", enum: Status, default: Status.ACTIVE })
  status: Status
  @OneToMany(() => Order, (order) => order.buyer)
  orders: Order[]
  @OneToMany(() => Review, (review) => review.gig)
  review: Review[]

  @Column()
  @IsDate()
  createdAt: Date
}
