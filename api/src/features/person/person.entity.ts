import { IsNotEmpty } from 'class-validator';
import { BaseEntity } from '../../core/database/base-entity/base.entity';
import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, OneToMany } from 'typeorm';
import { Region } from '../region/region.entity';
import { User } from '../user/user.entity';
import { DisabilityHistory } from '../disbility-history/disability.history.entity';

@Entity()
export class Person extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @Unique(['npi'])
    npi: string;

    @Column()
    @IsNotEmpty()
    @Unique(['email'])
    email: string;

    @Column({ nullable: false })
    tel: string;

    @Column({ nullable: false })
    firstname: string;

    @Column({ nullable: false })
    lastname: string;

    @Column({ nullable: false })
    birthDate: Date;

    @Column({ type: 'enum', enum: ['male', 'female'] })
    @IsNotEmpty()
    gender: string;

    @Column({ nullable: false })
    address: string;

    @Column({
        default: false,
    })
    @IsNotEmpty()
    isValid: boolean;

    @ManyToOne(() => Region)
    region: Region | number;

    @ManyToOne(() => User)
    registeredBy: User | number;

    @OneToMany(() => DisabilityHistory, (disability: DisabilityHistory) => disability.person)
    disabilities: DisabilityHistory[];

    @Column({ nullable: true })
    otp: number;

    @Column({ nullable: true })
    otpCreatedAt: Date;

    @Column({ default: 0 })
    otpAttempts: number;

    @Column({ default: false })
    isBlocked: boolean;

    @Column({ nullable: true })
    blockUntil: Date;
}
