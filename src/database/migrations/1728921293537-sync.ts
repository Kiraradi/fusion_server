import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1728921293537 implements MigrationInterface {
    name = 'Sync1728921293537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_entity" RENAME COLUMN "heyheyhey" TO "text"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_entity" RENAME COLUMN "text" TO "heyheyhey"`);
    }

}
