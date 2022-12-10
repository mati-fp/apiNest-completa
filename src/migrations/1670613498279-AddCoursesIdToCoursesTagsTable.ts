import {MigrationInterface, QueryRunner, TableCheck, TableColumn, TableForeignKey} from "typeorm";

export class AddCoursesIdToCoursesTagsTable1670613498279 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'courses_tags',
            new TableColumn({
                name: 'coursesId',
                type: 'uuid',
                isNullable: true,
            })
        );

        await queryRunner.createForeignKey(
            'courses_tags',
            new TableForeignKey({
                name: 'courses_tags_courses',
                columnNames: ['coursesId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'courses',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('courses_tags', 'courses_tags_courses');

        await queryRunner.dropColumn('courses_tags', 'coursesId');
    }

}
