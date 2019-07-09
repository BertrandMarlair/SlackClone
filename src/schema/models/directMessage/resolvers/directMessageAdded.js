import {withFilter} from "graphql-subscriptions";
import {DIRECT_MESSAGE_ADDED} from "..";
import pubsub from "../../../../utils/pubsub";
// import {requireAuth} from "../../../../utils/permission";

export default {
    subscribe: withFilter(
        () => pubsub.asyncIterator(DIRECT_MESSAGE_ADDED),
        (payload, args) => payload.channelId === args.channelId,
    ),
};
// export default {
//     subscribe: withFilter(
//         requireAuth.createResolver(
//             async (parents, {channelId}, {models, user}) => {
//                 // check if part of the team
//                 const channel = await models.Channel.findOne({
//                     where: {id: channelId},
//                 });
//                 const member = await models.Member.findOne({
//                     where: {teamId: channel.teamId, userId: user.id},
//                 });

//                 if (!member) {
//                     throw new Error(
//                         "You have to be a memeber to the team for get the messages",
//                     );
//                 }
//                 return pubsub.asyncIterator(MESSAGE_ADDED);
//             },
//         ),
//         (payload, args) => payload.channelId === args.channelId,
//     ),
// };
