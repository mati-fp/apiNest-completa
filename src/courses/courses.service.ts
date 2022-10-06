import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class CoursesService {
    constructor(@InjectRepository(Course) private readonly courseRepository: Repository<Course>,
                @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>) {}

    findAll() {
        return this.courseRepository.find({
            relations: ['tags'],
        });
    }

    findOne(id: string){
        const course = this.courseRepository.findOne(id, {
            relations: ['tags'],        });

        if(!course){
            throw new NotFoundException(`Course ID ${id} not found`);
        }

        return course;
    }

    async create(createCourseDto: CreateCourseDto){

        const tags = await Promise.all(
            createCourseDto.tags.map(name => this.preLoadTagByName(name)),
        );
        
        const course = this.courseRepository.create({
            ...createCourseDto,
            tags,
        });
        
        return this.courseRepository.save(course);
    }

    async update(id: string, updateCourseDto: UpdateCourseDto){

        const tags = updateCourseDto.tags && (
            await Promise.all(updateCourseDto.tags.map(name => this.preLoadTagByName(name)),)
        );

        const course = await this.courseRepository.preload({
            id: +id,
            ...updateCourseDto,
            tags,
        });

        if (!course) {
            throw new NotFoundException(`Course ID ${id} not found`);
        }

        return this.courseRepository.save(course);
    }

    async remove(id: string){
        const course = await this.courseRepository.findOne(id);

        if (!course) {
            throw new NotFoundException(`Course ID ${id} not found`);
        }

        return this.courseRepository.remove(course);
    }

    private async preLoadTagByName(name: string): Promise<Tag> {

        const tag = await this.tagRepository.findOne({ name });

        console.log('testando 1')
        if(tag){
            return tag;
        }
        console.log('testando 2')
        return this.tagRepository.create({ name });
          
    }
}
