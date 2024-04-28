/* eslint-disable @typescript-eslint/no-unused-vars */
import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import bcrypt from 'bcrypt';
import { User } from './user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    /**
     * Indicates that this subscriber only listen to User events.
     */
    listenTo() {
        return User;
    }

    /**
     * Called before post insertion.
     */
    async beforeInsert(event: InsertEvent<User>) {
        console.log(`BEFORE USER INSERTED: `, event.entity);
        console.log('hashPassword');
        if (event.entity.password) {
            const saltRounds = 10;
            event.entity.password = await bcrypt.hash(event.entity.password, saltRounds);
        }
    }

    /**
     * Called after entity insertion.
     */
    afterInsert(_event: InsertEvent<any>) {}
}
