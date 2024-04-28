/* eslint-disable @typescript-eslint/no-unused-vars */
import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import bcrypt from 'bcrypt';
import { Person } from './person.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<Person> {
    /**
     * Indicates that this subscriber only listen to Person events.
     */
    listenTo() {
        return Person;
    }

    /**
     * Called before post insertion.
     */
    async beforeInsert(event: InsertEvent<Person>) {}

    /**
     * Called after entity insertion.
     */
    afterInsert(_event: InsertEvent<any>) {}
}
