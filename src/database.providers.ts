import { DataSource } from 'typeorm';
import { CreateCoursesTable1670435196567 } from './migrations/1670435196567-CreateCoursesTable';
import { CreateTagsTable1670435548525 } from './migrations/1670435548525-CreateTagsTable';
import { CreateCoursesTagsTable1670613181212 } from './migrations/1670613181212-CreateCoursesTagsTable';
import { AddCoursesIdToCoursesTagsTable1670613498279 } from './migrations/1670613498279-AddCoursesIdToCoursesTagsTable';
import { AddTagsIdToCoursesTagsTable1670613918960 } from './migrations/1670613918960-AddTagsIdToCoursesTagsTable';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: 'postgres',
        password: 'docker',
        database: 'cursonestjs',
        entities: [ __dirname + '/../**/*.entity.js'],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'cursonestjs',
    migrations: [CreateCoursesTable1670435196567, CreateTagsTable1670435548525, CreateCoursesTagsTable1670613181212, AddCoursesIdToCoursesTagsTable1670613498279, AddTagsIdToCoursesTagsTable1670613918960],
    entities: [ __dirname + '/../**/*.entity.js'],
    synchronize: false,
  });