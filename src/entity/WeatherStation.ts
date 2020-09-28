import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class WeatherStation extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    ID!: string;

    @Column()
    coordinates!: string;

    @Column()
    name!: string;

    @Column({ type: 'timestamp' })
    manufacturingDate!: Date;
}
