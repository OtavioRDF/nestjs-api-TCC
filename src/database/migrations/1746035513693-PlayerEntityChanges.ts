import { MigrationInterface, QueryRunner } from "typeorm";

export class PlayerEntityChanges1746035513693 implements MigrationInterface {
    name = 'PlayerEntityChanges1746035513693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "mission" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "description" text,
                "completed" boolean NOT NULL DEFAULT false,
                "reputationReward" integer NOT NULL DEFAULT '0',
                "moneyReward" double precision NOT NULL DEFAULT '0',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "playerId" integer,
                CONSTRAINT "PK_54f1391034bc7dd30666dee0d4c" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "player" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "profile" character varying NOT NULL,
                "reputation" integer NOT NULL,
                "money" double precision NOT NULL DEFAULT '0',
                "skills" jsonb NOT NULL DEFAULT '{}',
                CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "mission"
            ADD CONSTRAINT "FK_3242d4b7c7ec2020c21fddeb83e" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "mission" DROP CONSTRAINT "FK_3242d4b7c7ec2020c21fddeb83e"
        `);
        await queryRunner.query(`
            DROP TABLE "player"
        `);
        await queryRunner.query(`
            DROP TABLE "mission"
        `);
    }

}
