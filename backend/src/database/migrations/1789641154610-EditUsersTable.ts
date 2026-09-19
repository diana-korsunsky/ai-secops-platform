import { MigrationInterface, QueryRunner } from "typeorm";

export class EditUsersTable1789641154610 implements MigrationInterface {
    name = 'EditUsersTable1789641154610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('PLATFORM_ADMIN', 'ORGANIZATION_ADMIN', 'SECURITY_ANALYST')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "CHK_ef1bec1a9127e497e29e76292e" CHECK (
  ("role" = 'PLATFORM_ADMIN' AND "organizationId" IS NULL)
  OR
  ("role" <> 'PLATFORM_ADMIN' AND "organizationId" IS NOT NULL)
)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "CHK_ef1bec1a9127e497e29e76292e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
