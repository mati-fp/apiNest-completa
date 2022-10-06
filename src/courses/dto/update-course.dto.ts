import { PartialType } from "@nestjs/mapped-types";
import { CreateCourseDto } from "./create-course.dto";

export class UpdateCourseDto extends PartialType(CreateCourseDto){
    //o partialtype pega toda classe do CreateDto E passa pra cá sem precisar repetir, e como o nome diz "partial",
    // e como o nome diz acaba n sendo necessário preencher todos os campos na requisição
    // ex: readonly name?: number;
}
