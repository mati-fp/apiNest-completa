import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "./tag.entity";
import {v4 as uuidv4} from 'uuid';

@Entity('courses')
export class Course {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @JoinTable({ name: 'courses_tags' })
    @ManyToMany(type => Tag, (tag:Tag) => tag.courses, {
        cascade: true,
    })
    tags: Tag[];

    @CreateDateColumn({ type: 'timestamp'})
    created_at: Date;

    @BeforeInsert()
    generatedId() {
        if (this.id) {
            return;
        }

        this.id = uuidv4();
    }
}