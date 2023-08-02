import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsersTable20230729000002 implements MigrationInterface {
    name = 'AddUsersTable20230729000002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "team_id" uuid NULL,
                "password_digest" character varying NOT NULL,
                "user_name" character varying NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_users_id" PRIMARY KEY ("id"),
            CONSTRAINT "UQ_user_name" UNIQUE ("user_name"),
            CONSTRAINT "FK_TEAMS_ID" FOREIGN KEY("team_id") 
            REFERENCES teams("id") 
            ON DELETE SET NULL 
            ON UPDATE cascade)`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_user_name"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
