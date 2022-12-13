import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CoursesController } from './courses.controller';
import { coursesProviders } from './courses.providers';
import { CoursesService } from './courses.service';
import { tagsProviders } from './tags.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [CoursesController],
    providers: [CoursesService, ...coursesProviders, ...tagsProviders],
    
})
export class CoursesModule {}
