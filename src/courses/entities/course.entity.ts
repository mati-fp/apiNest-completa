import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "./tag.entity";

@Entity()
export class Course {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @JoinTable()
    @ManyToMany(type => Tag, (tag:Tag) => tag.courses, {
        cascade: true,
    })
    tags: Tag[];
}