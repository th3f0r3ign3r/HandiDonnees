/* eslint-disable @typescript-eslint/no-unused-vars */
import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import bcrypt from 'bcrypt';
import { ArticleCategory } from './article.category.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<ArticleCategory> {
    /**
     * Indicates that this subscriber only listen to ArticleCategory events.
     */
    listenTo() {
        return ArticleCategory;
    }

    /**
     * Called before post insertion.
     */
    async beforeInsert(event: InsertEvent<ArticleCategory>) {}

    /**
     * Called after entity insertion.
     */
    afterInsert(_event: InsertEvent<any>) {}
}
