import { NotFoundException } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';




describe('CoursesService', () => {
  let service: CoursesService;
  let id;
  let date;

  beforeEach(async () => {
    service = new CoursesService();
    id = 'cf0217c1-ef2d-4bda-a387-6859ee6a183b'; //pegar um uuid já existente no banco de dados para testar
    date = new Date();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a course', async () => {
    const expectOutputTags = [
      {
        id,
        name : 'nestjs',
        created_at: date,
      },
    ];
    const expectOutputCourse = {  //criamos aqui um objeto de curso pois passamos um objeto no método create
      id,
      name: 'Test',
      description: 'Test description',
      created_at: date,
      tags: expectOutputTags,
    };

    const mockCourseRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse))
    };

    const mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn()
    };
    //passamos esse comando para ignorar o erro referente ao resto dos méetodos presentes em um repository
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const createCourseDto: CreateCourseDto = {
      name: 'Test',
      description: 'Test description',
      tags: ['nestjs'],
    };

    const newCourse = await service.create(createCourseDto);
    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(expectOutputCourse).toStrictEqual(newCourse);
  });

  it('should list courses', async () => {
    const expectOutputTags = [
      {
        id,
        name : 'nestjs',
        created_at: date,
      },
    ];
    const expectOutputCourse = [{  //criamos aqui um objeto de curso pois passamos um objeto no método create
      id,
      name: 'Test',
      description: 'Test description',
      created_at: date,
      tags: expectOutputTags,
    }];

    const mockCourseRepository = {
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse))
    };

    //passamos esse comando para ignorar o erro referente ao resto dos méetodos presentes em um repository
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;


    const courses = await service.findAll();
    expect(mockCourseRepository.find).toHaveBeenCalled();
    expect(expectOutputCourse).toStrictEqual(courses);
  });

  it('should get a course', async () => {
    const expectOutputTags = [
      {
        id,
        name : 'nestjs',
        created_at: date,
      },
    ];
    const expectOutputCourse = [{  //criamos aqui um objeto de curso pois passamos um objeto no método create
      id,
      name: 'Test',
      description: 'Test description',
      created_at: date,
      tags: expectOutputTags,
    }];

    const mockCourseRepository = {
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
    };

    //passamos esse comando para ignorar o erro referente ao resto dos méetodos presentes em um repository
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;


    const course = await service.findOne(id);
    expect(mockCourseRepository.findOne).toHaveBeenCalled();
    expect(expectOutputCourse).toStrictEqual(course);
  });

  it('should return error if course not exist', async () => {
    const expectOutputTags = [
      {
        id,
        name : 'nestjs',
        created_at: date,
      },
    ];
    const expectOutputCourse = [{  //criamos aqui um objeto de curso pois passamos um objeto no método create
      id,
      name: 'Test',
      description: 'Test description',
      created_at: date,
      tags: expectOutputTags,
    }];

    const mockCourseRepository = {
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
    };

    //passamos esse comando para ignorar o erro referente ao resto dos méetodos presentes em um repository
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;


    try {
      const course = await service.findOne(id+'qualquerCoisaSoPraMudarId');
    } catch (error) {
      expect(mockCourseRepository.findOne).toHaveBeenCalled();
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should update a course', async () => {
    const expectOutputTags = [
      {
        id,
        name : 'nestjs',
        created_at: date,
      },
    ];
    const expectOutputCourse = {  //criamos aqui um objeto de curso pois passamos um objeto no método create
      id,
      name: 'Test',
      description: 'Test description',
      created_at: date,
      tags: expectOutputTags,
    };

    const mockCourseRepository = {
      update: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse))
    };

    const mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn()
    };
    //passamos esse comando para ignorar o erro referente ao resto dos méetodos presentes em um repository
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const updateCourseDto: UpdateCourseDto = {
      name: 'Test',
      description: 'Test description',
      tags: ['nestjs'],
    };

    const Course = await service.update(id, updateCourseDto);
    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(expectOutputCourse).toStrictEqual(Course);
  });

  it('should not update and error when a course !exist', async () => {
    const expectOutputTags = [
      {
        id,
        name : 'nestjs',
        created_at: date,
      },
    ];
    const expectOutputCourse = {  //criamos aqui um objeto de curso pois passamos um objeto no método create
      id,
      name: 'Test',
      description: 'Test description',
      created_at: date,
      tags: expectOutputTags,
    };

    const mockCourseRepository = {
      update: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse))
    };

    const mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn()
    };
    //passamos esse comando para ignorar o erro referente ao resto dos méetodos presentes em um repository
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const updateCourseDto: UpdateCourseDto = {
      name: 'Test',
      description: 'Test description',
      tags: ['nestjs'],
    };

    try {
      const Course = await service.update(id+"idQueNaoExiste", updateCourseDto);
    } catch (error) {
      expect(mockCourseRepository.save).toHaveBeenCalled();
      expect(error).toBeInstanceOf(NotFoundException);
    }
    
  });

  it('should delete a course', async () => {
    const expectOutputTags = [
      {
        id,
        name : 'nestjs',
        created_at: date,
      },
    ];
    const expectOutputCourse = [{  //criamos aqui um objeto de curso pois passamos um objeto no método create
      id,
      name: 'Test',
      description: 'Test description',
      created_at: date,
      tags: expectOutputTags,
    }];

    const mockCourseRepository = {
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
    };

    //passamos esse comando para ignorar o erro referente ao resto dos méetodos presentes em um repository
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;


    const course = await service.remove(id);
    expect(mockCourseRepository.remove).toHaveBeenCalled();
    expect(expectOutputCourse).toStrictEqual(course);
  });


  //versões antigas

  // describe('findOne', () => {
  //   describe('buscarCursoPeloId', () => {

  //     it('deve retornar o objeto Course', async () => {
  //       const courseId = '1';
  //       const expectedCourse = {};

  //       courseRepository.findOne.mockReturnValue(expectedCourse);
  //       const course = await service.findOne(courseId);
  //       expect(course).toEqual(expectedCourse);
  //     });

  //     it('deve retornar notFoundException', async () => {
  //       const courseId = '1';

  //       courseRepository.findOne.mockReturnValue(undefined);
  //       try {
  //         const course = await service.findOne(courseId);
  //       } catch (error) {
  //         expect(error).toBeInstanceOf(NotFoundException);
  //         //expect(error.message).toEqual(`Course ID ${courseId} not found`);
  //       }
  //     });
  //   });
  // });
});
