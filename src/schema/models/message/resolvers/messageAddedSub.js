import {withFilter} from "graphql-subscriptions";
import {MESSAGE_ADDED} from "..";
import pubsub from "../../../../utils/pubsub";
import {requireTeamAccess} from "../../../../utils/permission";

export default {
    subscribe: requireTeamAccess.createResolver(
        withFilter(
            () => pubsub.asyncIterator(MESSAGE_ADDED),
            (payload, args) => payload.channelId === args.channelId,
        ),
    ),
};
