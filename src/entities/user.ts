import { IsDate, IsEmail } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Gig } from "./gig"

export enum Role {
  CLIENT = "client",
  FREELANCER = "freelancer",
  ADMIN = "admin",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  username: string

  @Column({ nullable: false })
  @IsEmail()
  email: string

  @Column({ nullable: false })
  password: string

  @Column({
    type: "enum",
    enum: Role,
    default: Role.CLIENT,
  })
  role: Role

  @Column({ nullable: true })
  profileImage: string

  @Column("text", { array: true, nullable: false })
  skills: string[]

  @Column({ nullable: true })
  bio: string

  @Column()
  lastLoginIP: string

  @Column("jsonb", { nullable: true })
  location: {
    city: string
    country: string
  }

  @Column({ type: "boolean", default: false })
  emailVerified: boolean

  @Column({ type: "varchar", nullable: true })
  verificationCode: string | null

  @Column()
  @IsDate()
  codeExpirationDate: Date
  @OneToMany(() => Gig, (gig) => gig.sellerId)
  gigs: Gig[]

  @Column()
  @IsDate()
  createdAt: Date
}
