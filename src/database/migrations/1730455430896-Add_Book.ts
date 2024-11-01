import { MigrationInterface, QueryRunner } from "typeorm";

export class Add_Book1730455430896 implements MigrationInterface {
  name = "Add_Book1730455430896";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."book_genre_enum" AS ENUM('Fantasy', 'Travel', 'Autobiography')`,
    );
    await queryRunner.query(
      `CREATE TABLE "book" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "cover" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "genre" "public"."book_genre_enum" NOT NULL, "author" character varying NOT NULL, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "book"`);
    await queryRunner.query(`DROP TYPE "public"."book_genre_enum"`);
  }
}
