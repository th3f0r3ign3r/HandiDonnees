import { BaseEntity } from '../../core/database/base-entity/base.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { ArticleCategory } from '../article-category/article.category.entity';

@Entity()
export class Article extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    author: User | number;

    @ManyToOne(() => ArticleCategory)
    category: ArticleCategory | number;

    @Column({ nullable: false })
    title: string;

    @Column({
        nullable: true,
    })
    content: string;
}
