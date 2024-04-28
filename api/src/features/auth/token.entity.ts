import { Entity, Column, PrimaryGeneratedColumn, Index, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import tokenTypes from '../../core/configs/token.config';
import { BaseEntity } from '../../core/database/base-entity/base.entity';
import { Person } from '../person/person.entity';

@Entity()
export class Token extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index({ unique: true })
    token: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE', nullable: true })
    user: User;

    @ManyToOne(() => Person, { onDelete: 'CASCADE', nullable: true })
    person: Person;

    @Column({ type: 'enum', enum: tokenTypes })
    type: string;

    @Column()
    expires: Date;

    @Column({ default: false })
    blacklisted: boolean;
}
