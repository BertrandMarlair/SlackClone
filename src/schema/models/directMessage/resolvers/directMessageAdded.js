import {withFilter} from "graphql-subscriptions";
import {DIRECT_MESSAGE_ADDED} from "..";
import pubsub from "../../../../utils/pubsub";
import {requireDirectMessageAccess} from "../../../../utils/permission";

export default {
    subscribe: requireDirectMessageAccess.createResolver(
        withFilter(
            () => pubsub.asyncIterator(DIRECT_MESSAGE_ADDED),
            (payload, args, {user}) =>
                payload.teamId === args.teamId &&
                ((payload.senderId === user.id &&
                    payload.receiverId === args.userId) ||
                    (payload.senderId === args.userId &&
                        payload.receiverId === user.id)),
        ),
    ),
};
