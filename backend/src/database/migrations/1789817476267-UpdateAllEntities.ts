import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAllEntities1789817476267 implements MigrationInterface {
    name = 'UpdateAllEntities1789817476267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_f3d6aea8fcca58182b2e80ce979"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "CHK_ef1bec1a9127e497e29e76292e"`);
        await queryRunner.query(`CREATE TYPE "public"."companies_status_enum" AS ENUM('ACTIVE', 'SUSPENDED')`);
        await queryRunner.query(`CREATE TABLE "companies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "companyName" character varying(70) NOT NULL, "companyRegistrationNumber" character varying(70) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."companies_status_enum" NOT NULL DEFAULT 'ACTIVE', CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."invitations_role_enum" AS ENUM('SYSTEM_ADMIN', 'COMPANY_ADMIN', 'SECURITY_ANALYST')`);
        await queryRunner.query(`CREATE TYPE "public"."invitations_status_enum" AS ENUM('PENDING', 'ACCEPTED', 'EXPIRED', 'REVOKED')`);
        await queryRunner.query(`CREATE TABLE "invitations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tokenHash" character varying(255) NOT NULL, "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL, "email" character varying(255) NOT NULL, "role" "public"."invitations_role_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."invitations_status_enum" NOT NULL DEFAULT 'PENDING', "acceptedAt" TIMESTAMP WITH TIME ZONE, "companyId" uuid, CONSTRAINT "UQ_a6eb6f2543de8a5a4c148b32a18" UNIQUE ("tokenHash"), CONSTRAINT "CHK_c4ff526d0649c90c5e12bf7902" CHECK (
  ("role" = 'SYSTEM_ADMIN' AND "companyId" IS NULL)
  OR
  ("role" <> 'SYSTEM_ADMIN' AND "companyId" IS NOT NULL)
), CONSTRAINT "PK_5dec98cfdfd562e4ad3648bbb07" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."company_onboarding_requests_status_enum" AS ENUM('PENDING', 'APPROVED', 'REJECTED')`);
        await queryRunner.query(`CREATE TABLE "company_onboarding_requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "companyName" character varying(70) NOT NULL, "companyRegistrationNumber" character varying(70) NOT NULL, "contactName" character varying(70) NOT NULL, "contactEmail" character varying(255) NOT NULL, "contactPhone" character varying(30), "status" "public"."company_onboarding_requests_status_enum" NOT NULL DEFAULT 'PENDING', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "message" text, CONSTRAINT "PK_97c7b4cd9906044ca7b2818c7c1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "organizationId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "firstName" character varying(70) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "companyId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "passwordHash"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "passwordHash" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TYPE "public"."users_role_enum" RENAME TO "users_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('SYSTEM_ADMIN', 'COMPANY_ADMIN', 'SECURITY_ANALYST')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum" USING "role"::"text"::"public"."users_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "CHK_843daac1122f4fcfea79f16612" CHECK (
  ("role" = 'SYSTEM_ADMIN' AND "companyId" IS NULL)
  OR
  ("role" <> 'SYSTEM_ADMIN' AND "companyId" IS NOT NULL)
)`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_6f9395c9037632a31107c8a9e58" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invitations" ADD CONSTRAINT "FK_c6c23a94f8c31d43ad25bcb2920" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invitations" DROP CONSTRAINT "FK_c6c23a94f8c31d43ad25bcb2920"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_6f9395c9037632a31107c8a9e58"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "CHK_843daac1122f4fcfea79f16612"`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum_old" AS ENUM('PLATFORM_ADMIN', 'ORGANIZATION_ADMIN', 'SECURITY_ANALYST')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum_old" USING "role"::"text"::"public"."users_role_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."users_role_enum_old" RENAME TO "users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "passwordHash"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "passwordHash" character varying(70) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "companyId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "organizationId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying(70) NOT NULL`);
        await queryRunner.query(`DROP TABLE "company_onboarding_requests"`);
        await queryRunner.query(`DROP TYPE "public"."company_onboarding_requests_status_enum"`);
        await queryRunner.query(`DROP TABLE "invitations"`);
        await queryRunner.query(`DROP TYPE "public"."invitations_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."invitations_role_enum"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TYPE "public"."companies_status_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "CHK_ef1bec1a9127e497e29e76292e" CHECK ((((role = 'PLATFORM_ADMIN'::users_role_enum) AND ("organizationId" IS NULL)) OR ((role <> 'PLATFORM_ADMIN'::users_role_enum) AND ("organizationId" IS NOT NULL))))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_f3d6aea8fcca58182b2e80ce979" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
