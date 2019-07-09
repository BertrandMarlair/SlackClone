import log from "../../../../utils/logger";
import {requireAuth} from "../../../../utils/permission";
import {DIRECT_MESSAGE_ADDED} from "..";
import pubsub from "../../../../utils/pubsub";

export default requireAuth.createResolver(
    async (parent, args, {models, user}) => {
        try {
            const directMessage = await models.DirectMessage.create({
                ...args,
                sender: user.id,
            });
            const asyncFunc = async () => {
                const currentUser = await models.User.findOne({
                    where: {
                        id: user.id,
                    },
                });

                pubsub.publish(DIRECT_MESSAGE_ADDED, {
                    sender: args.receiver,
                    directMessageAdded: {
                        ...directMessage.dataValues,
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
