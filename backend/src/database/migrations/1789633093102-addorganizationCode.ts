import { MigrationInterface, QueryRunner } from "typeorm";

export class AddorganizationCode1789633093102 implements MigrationInterface {
    name = 'AddorganizationCode1789633093102'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organizations" ADD "organizationCode" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD CONSTRAINT "UQ_2c212cf497dbbf4ead8a4e87bf2" UNIQUE ("organizationCode")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organizations" DROP CONSTRAINT "UQ_2c212cf497dbbf4ead8a4e87bf2"`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP COLUMN "organizationCode"`);
    }

}
