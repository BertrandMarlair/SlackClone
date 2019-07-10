import log from "../../../../utils/logger";
import {requireAuth} from "../../../../utils/permission";
import {DIRECT_MESSAGE_ADDED} from "..";
import pubsub from "../../../../utils/pubsub";

export default requireAuth.createResolver(
    async (parent, args, {models, user}) => {
        try {
            const directMessage = await models.DirectMessage.create({
                ...args,
                senderId: user.id,
            });

            pubsub.publish(DIRECT_MESSAGE_ADDED, {
                teamId: args.teamId,
                senderId: user.id,
                receiverId: args.receiverId,
                directMessageAdded: {
                    ...directMessage.dataValues,
                    sender: {
                        id: user.id,
                        username: user.username,
                    },
                },
            });

            return true;
        } catch (err) {
            log.error(err);
            return false;
        }
    },
);
