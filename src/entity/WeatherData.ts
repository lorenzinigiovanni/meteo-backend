import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class WeatherData extends BaseEntity {

    @PrimaryGeneratedColumn()
    ID!: number;

    @Column({ type: 'uuid' })
    weatherStationID!: string;

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
}
