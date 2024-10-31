import { MigrationInterface, QueryRunner } from "typeorm";

export class Added_Avatar_for_user1730357822703 implements MigrationInterface {
  name = "Added_Avatar_for_user1730357822703";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "avatar" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
  }
}
