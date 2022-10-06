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
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      return {
        type: configService.get('TYPEORM_CONNECTION') as any,
        host: configService.get('TYPEORM_HOST') as any,
        port: configService.get('TYPEORM_PORT') as any,
        username: configService.get('TYPEORM_USERNAME') as any,
        password: configService.get('TYPEORM_PASSWORD') as any,
        database: configService.get('TYPEORM_DATABASE') as any,
        entities: [Course, Tag],
        logging: true,
        cli: {
          migrationsDir: configService.get('TYPEORM_MIGRATIONS_DIR') as any,
        }
      }
    }  
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
