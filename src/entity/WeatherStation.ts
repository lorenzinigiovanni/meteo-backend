import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { WeatherData } from './WeatherData';

@Entity()
export class WeatherStation extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    ID!: string;

    @Column()
    coordinates!: string;

    @Column()
    name!: string;

    @Column({ type: 'real', nullable: true })
    altitude?: number;

    @Column({ type: 'timestamp' })
    manufacturingDate!: Date;

    @OneToMany(() => WeatherData, weatherdata => weatherdata.weatherstation)
    weatherdatas!: WeatherData[];
}
