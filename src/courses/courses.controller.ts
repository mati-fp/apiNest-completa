import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Res } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService){}
    
    @Get()
    findAll() {
        return this.coursesService.findAll();
    }

    // @Get(':id')
    // findOne(@Param() params) {
    //     return `Curso #${params.id}`;
    // }
    //esses dois são a mesma coisa praticamente 
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.coursesService.findOne(id);
    }

    @Post()
    create(@Body() createCourseDto: CreateCourseDto) {
        return this.coursesService.create(createCourseDto);
    }
    // no segundo metodo ele pode passar tudo mas só vai pegar o parâmetro name
    // @Post('post2')
    // create2(@Body('name') body) {
    //     return body;
    // }
    //aqui força ele devolver nada mas foi feita a criação
    // @Post()
    // @HttpCode(204)
    // create3(@Body('name') body) {
    //     return body;
    // }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
        return this.coursesService.update(id, updateCourseDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coursesService.remove(id);
    }

}
