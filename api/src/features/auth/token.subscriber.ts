/* eslint-disable @typescript-eslint/no-unused-vars */
import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { Token } from './token.entity';

@EventSubscriber()
export class TokenSubscriber implements EntitySubscriberInterface<Token> {
    /**
     * Indicates that this subscriber only listen to Token events.
     */
    listenTo() {
        return Token;
    }
    /**
     * Called before token insertion.
     */
    beforeInsert(_event: InsertEvent<any>) {}

    /**
     * Called after entity insertion.
     */
    afterInsert(_event: InsertEvent<any>) {}
}
