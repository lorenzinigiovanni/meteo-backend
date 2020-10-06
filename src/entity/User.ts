import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable } from 'typeorm';
import { WeatherStation } from './WeatherStation';

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

    @ManyToMany(type => WeatherStation, { cascade: ['insert', 'update'] }) @JoinTable()
    weatherStations!: WeatherStation[];

}
