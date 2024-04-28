import { BaseEntity } from '../../core/database/base-entity/base.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Disability extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    type: string;

    @Column({ nullable: true })
    description: string;
}
