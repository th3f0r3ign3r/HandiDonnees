/* eslint-disable @typescript-eslint/no-unused-vars */
import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import bcrypt from 'bcrypt';
import { DisabilityHistory } from './disability.history.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<DisabilityHistory> {
    /**
     * Indicates that this subscriber only listen to DisabilityHistory events.
     */
    listenTo() {
        return DisabilityHistory;
    }

    /**
     * Called before post insertion.
     */
    async beforeInsert(event: InsertEvent<DisabilityHistory>) {}

    /**
     * Called after entity insertion.
     */
    afterInsert(_event: InsertEvent<any>) {}
}
