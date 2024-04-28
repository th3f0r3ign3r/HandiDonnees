import { IsNotEmpty } from 'class-validator';
import { BaseEntity } from '../../core/database/base-entity/base.entity';
import bcrypt from 'bcrypt';
import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { roles } from '../../core/configs/roles.config';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    @Unique(['ifu'])
    ifu: string;

    @Column()
    @IsNotEmpty()
    @Unique(['email'])
    email: string;

    @Column({ nullable: false })
    fullname: string;

    @Column({
        default: false,
    })
    @IsNotEmpty()
    isEmailVerified: boolean;

    @Column({
        type: 'enum',
        enum: roles,
        default: 'partner',
    })
    @IsNotEmpty()
    role: string;

    @Column({ select: false })
    @IsNotEmpty()
    password: string;

    public async isPasswordMatch(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}
