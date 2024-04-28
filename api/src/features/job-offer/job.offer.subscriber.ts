/* eslint-disable @typescript-eslint/no-unused-vars */
import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import bcrypt from 'bcrypt';
import { JobOffer } from './job.offer.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<JobOffer> {
    /**
     * Indicates that this subscriber only listen to JobOffer events.
     */
    listenTo() {
        return JobOffer;
    }

    /**
     * Called before post insertion.
     */
    async beforeInsert(event: InsertEvent<JobOffer>) {}

    /**
     * Called after entity insertion.
     */
    afterInsert(_event: InsertEvent<any>) {}
}
