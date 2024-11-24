import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePlayersEntity1732123507081 implements MigrationInterface {
    name = 'CreatePlayersEntity1732123507081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "player" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "profile" character varying NOT NULL,
                "reputation" integer NOT NULL,
                "skills" jsonb NOT NULL DEFAULT '{}',
                CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "player"
        `);
    }

}
