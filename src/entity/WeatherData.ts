import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { WeatherStation } from './WeatherStation';


@Entity()
export class WeatherData extends BaseEntity {

    @PrimaryGeneratedColumn()
    ID!: number;

    @Column({ type: 'timestamp' })
    time!: Date;

    @Column({ type: 'real', nullable: true })
    temperature?: number;

    @Column({ type: 'real', nullable: true })
    humidity?: number;

    @Column({ type: 'real', nullable: true })
    pressure?: number;

    @Column({ type: 'real', nullable: true })
    rain?: number;

    @ManyToOne(() => WeatherStation, weatherstation => weatherstation.weatherdatas)
    weatherstation!: WeatherStation;
}
