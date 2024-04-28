import { IsNotEmpty } from 'class-validator';
import { BaseEntity } from '../../core/database/base-entity/base.entity';
import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
export class RegistrationRequest extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    @Unique(['ifu'])
    ifu: string;

    @Column()
    @IsNotEmpty()
    @Unique(['email'])
    email: string;

    @Column({ nullable: true })
    fullname: string;

    @Column()
    @IsNotEmpty()
    concat: string;

    @Column()
    @IsNotEmpty()
    address: string;

    @Column()
    @IsNotEmpty()
    goal: string;
}
