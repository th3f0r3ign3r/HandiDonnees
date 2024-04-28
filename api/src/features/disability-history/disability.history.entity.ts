import { BaseEntity } from '../../core/database/base-entity/base.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Disability } from '../disability/disability.entity';
import { Person } from '../person/person.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class DisabilityHistory extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    date: Date;

    @Column({ nullable: true })
    gravity: string;

    @ManyToOne(() => Disability)
    disability: Disability | number;

    @ManyToOne(() => Person, (person) => person.disabilities)
    @JoinColumn()
    person: Person | number;

    @Column({
        default: false,
    })
    @IsNotEmpty()
    isActive: boolean;

    @Column({
        default: false,
    })
    @IsNotEmpty()
    isValid: boolean;
}
