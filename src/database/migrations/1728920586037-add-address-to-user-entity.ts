import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAddressToUserEntity1728920586037 implements MigrationInterface {
  name = "AddAddressToUserEntity1728920586037";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "address" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address"`);
  }
}
