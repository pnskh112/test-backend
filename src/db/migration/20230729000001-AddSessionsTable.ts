import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSessionsTable20230729000001 implements MigrationInterface {
    name = 'AddSessionsTable20230729000001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "sessions" (
                "sid" character varying NOT NULL,
                "sess" json NOT NULL,
                "expire" TIMESTAMP NOT NULL,
            CONSTRAINT "PK_sessions_sid" PRIMARY KEY ("sid"))`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "sessions"`);
    }

}
