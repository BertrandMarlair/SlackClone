import {withFilter} from "graphql-subscriptions";
import {MESSAGE_ADDED} from "..";
import pubsub from "../../../../utils/pubsub";

export default {
    subscribe: withFilter(
        () => pubsub.asyncIterator(MESSAGE_ADDED),
        (payload, args) => payload.channelId === args.channelId,
    ),
};
