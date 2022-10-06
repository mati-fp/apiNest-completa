import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";

@Entity('tags')
export class Tag {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => Course, (course: Course) => course.tags)
    courses: Course[];
}
