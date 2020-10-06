import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    ID!: string;

    @Column()
    surname!: string;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

}
