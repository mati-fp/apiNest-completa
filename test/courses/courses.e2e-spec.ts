import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request  from 'supertest'; // estava: import * as resquest from 'supertest'
import {CoursesModule} from '../../src/courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCourseDto } from '../../src/courses/dto/create-course.dto';

describe('Courses: /courses', () => {
  let app: INestApplication;

  const course: CreateCourseDto = {
    name: "Nestjs com typeorm",
    description: "Criando apis restfull com nestjs",
    tags : ["nestjs", "typeorm", "nodejs", "typescrypt"]
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CoursesModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5433,
            username: 'postgres',
            password: 'docker',
            database: 'testdb',
            autoLoadEntities: true,
            synchronize: true,
          })
        ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true, //NÃO DEIXA PASSAR UM VALOR QUE NÃO EXISTA, PARA TODA A REQUISIÇÃO
        transform: true,
    }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  })

  it('Create POST /courses', () => {
        return request(app.getHttpServer())
        .post('/courses')
        .send(course as CreateCourseDto)
        .expect(HttpStatus.CREATED)
        .then(({body}) => {
            const expectedCourse = jasmine.objectContaining({
                ...course,
                tags: jasmine.arrayContaining(
                    course.tags.map(name => jasmine.objectContaining({name}))
                )
            })
            expect(body).toEqual(expectedCourse)
        })
  });
});
