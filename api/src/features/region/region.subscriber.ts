/* eslint-disable @typescript-eslint/no-unused-vars */
import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import bcrypt from 'bcrypt';
import { Region } from './region.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<Region> {
    /**
     * Indicates that this subscriber only listen to Region events.
     */
    listenTo() {
        return Region;
    }

    /**
     * Called before post insertion.
     */
    async beforeInsert(event: InsertEvent<Region>) {}

    /**
     * Called after entity insertion.
     */
    afterInsert(_event: InsertEvent<any>) {}
}
