import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsersTable20230729000000 implements MigrationInterface {
    name = 'AddTeamsTable20230729000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "teams" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "code" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_teams_id" PRIMARY KEY ("id"),
            CONSTRAINT "UQ_teams_code" UNIQUE ("code")
            )`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_teams_code"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
