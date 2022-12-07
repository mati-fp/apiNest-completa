import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { Course } from './courses/entities/course.entity';
import { Tag } from './courses/entities/tag.entity';

@Module({
  imports: [CoursesModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'docker',
      database: 'cursonestjs',
      entities: [__dirname + '/**/*.entity.js'],
      migrations: [`dist/migrations/*{.js, .ts}`],
      autoLoadEntities: false,
      synchronize: false,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


// @Module({
//   imports: [CoursesModule,
//     ConfigModule.forRoot(),
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: 'db',
//       port: 5432,
//       username: 'postgres',
//       password: 'docker',
//       database: 'cursonestjs',
//       entities: [__dirname + `/**/*.entity{.js, .ts}`],

//   })],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
