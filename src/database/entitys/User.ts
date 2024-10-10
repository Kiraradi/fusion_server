import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  dayOfBirthday: string;
}
