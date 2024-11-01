import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Author } from "./Author";
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
  genre: GenresType[];

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;
}
