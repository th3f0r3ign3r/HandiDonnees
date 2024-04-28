import { BaseEntity } from '../../core/database/base-entity/base.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class JobOffer extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    employer: string;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false })
    location: string;

    @Column({ nullable: true })
    contract: string;

    @Column({ nullable: true })
    postedAt: Date;

    @Column({ nullable: true })
    expiresAt: Date;

    @ManyToOne(() => User)
    createdBy: User;
}
