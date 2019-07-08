import log from "../../../../utils/logger";
import {requireAuth} from "../../../../utils/permission";
import {MESSAGE_ADDED} from "..";
import pubsub from "../../../../utils/pubsub";

export default requireAuth.createResolver(
    async (parent, args, {models, user}) => {
        try {
            const message = await models.Message.create({
                ...args,
                userId: user.id,
            });
            const asyncFunc = async () => {
                const currentUser = await models.User.findOne({
                    where: {
                        id: user.id,
                    },
                });

                pubsub.publish(MESSAGE_ADDED, {
                    channelId: args.channelId,
                    messageAdded: {
                        ...message.dataValues,
                        user: currentUser.dataValues,
                    },
                });
            };

            asyncFunc();
            return true;
        } catch (err) {
            log.error(err);
            return false;
        }
    },
);
