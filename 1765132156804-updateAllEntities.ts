import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAllEntities1765132156804 implements MigrationInterface {
    name = 'UpdateAllEntities1765132156804'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "address"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "address" character varying`);
    }

}
