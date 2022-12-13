import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [CoursesModule,
    ConfigModule.forRoot(),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'db',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'docker',
    //   database: 'cursonestjs',
    //   entities: [__dirname + '/**/*.entity.js'],
    //   migrations: [`dist/migrations/*{.js, .ts}`],
    //   autoLoadEntities: false,
    //   synchronize: false,
    // }),
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

