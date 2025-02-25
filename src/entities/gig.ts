import { IsDate, IsEmail } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./user"
export enum Status {
  ACTIVE = "active",
  BANNED = "banned",
}
@Entity()
export class Gig {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.gigs, { onDelete: "CASCADE" })
  sellerId: number
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
  @Column()
  image: string
  @Column({ type: "decimal", precision: 10, scale: 2 })
  rating: number
  @Column({ type: "enum", enum: Status, default: Status.ACTIVE })
  status: Status
  @Column()
  @IsDate()
  createdAt: Date
}
