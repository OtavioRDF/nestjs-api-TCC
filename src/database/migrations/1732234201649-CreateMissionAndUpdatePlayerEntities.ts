import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMissionAndUpdatePlayerEntities1732234201649 implements MigrationInterface {
    name = 'CreateMissionAndUpdatePlayerEntities1732234201649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "player" 
                ADD "money" double precision NOT NULL DEFAULT '0'
        `);
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
            ALTER TABLE "mission"
            ADD CONSTRAINT "FK_3242d4b7c7ec2020c21fddeb83e" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "mission" DROP CONSTRAINT "FK_3242d4b7c7ec2020c21fddeb83e"
        `);
        await queryRunner.query(`
            DROP TABLE "mission"
        `);
        await queryRunner.query(`
            DROP TABLE "player"
        `);
    }

}
