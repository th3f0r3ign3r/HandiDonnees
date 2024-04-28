/* eslint-disable @typescript-eslint/no-unused-vars */
import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import bcrypt from 'bcrypt';
import { RegistrationRequest } from './registration.request.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<RegistrationRequest> {
    /**
     * Indicates that this subscriber only listen to RegistrationRequest events.
     */
    listenTo() {
        return RegistrationRequest;
    }

    /**
     * Called before post insertion.
     */
    async beforeInsert(event: InsertEvent<RegistrationRequest>) {}

    /**
     * Called after entity insertion.
     */
    afterInsert(_event: InsertEvent<any>) {}
}
