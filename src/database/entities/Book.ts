import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { GenresType } from "../../types/types";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cover: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({
    type: "enum",
    enum: ["Fantasy", "Travel", "Autobiography"],
  })
  genre: GenresType;

  @Column()
  author: string;
}
