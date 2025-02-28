import { IsDate, IsEmail } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./user"
import { Gig } from "./gig"
export enum Status {
  PENDING = "pending",
  COMPLETED = "completed",
}
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number
  @Column({ type: "enum", enum: Status, default: Status.PENDING })
  status: Status
  @ManyToOne(() => User, (user) => user.gigs, { onDelete: "CASCADE" })
  buyer: User
  @ManyToOne(() => Gig, (gig) => gig.orders, { onDelete: "CASCADE" })
  gig: Gig
  @Column()
  @IsDate()
  createdAt: Date
  
}
