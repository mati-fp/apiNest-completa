import {MigrationInterface, QueryRunner} from "typeorm";

export class CourseRefactoring1665007917179 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "course" RENAME COLUMN "name" TO "course"`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "course" RENAME COLUMN "course" TO "name"`,
        ) // reverts things made in "up" method
    }
    

}
