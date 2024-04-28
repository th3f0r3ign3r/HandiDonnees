/* eslint-disable @typescript-eslint/no-unused-vars */
import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import bcrypt from 'bcrypt';
import { Disability } from './disability.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<Disability> {
    /**
     * Indicates that this subscriber only listen to Disability events.
     */
    listenTo() {
        return Disability;
    }

    /**
     * Called before post insertion.
     */
    async beforeInsert(event: InsertEvent<Disability>) {}

    /**
     * Called after entity insertion.
     */
    afterInsert(_event: InsertEvent<any>) {}
}
