/* eslint-disable @typescript-eslint/no-unused-vars */
import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import bcrypt from 'bcrypt';
import { Article } from './article.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<Article> {
    /**
     * Indicates that this subscriber only listen to Article events.
     */
    listenTo() {
        return Article;
    }

    /**
     * Called before post insertion.
     */
    async beforeInsert(event: InsertEvent<Article>) {}

    /**
     * Called after entity insertion.
     */
    afterInsert(_event: InsertEvent<any>) {}
}
