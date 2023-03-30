import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAvatarField1680079283360 implements MigrationInterface {
    name = 'AddAvatarField1680079283360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "avatar" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
    }

}
