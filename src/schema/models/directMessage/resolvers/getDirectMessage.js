import {requireAuth} from "../../../../utils/permission";

export default requireAuth.createResolver(
    (parent, {teamId, ortherUser}, {models, user}) => {
        const {or, and} = models.Sequelize.Op;

        return models.DirectMessage.findAll({
            where: {
                teamId,
                [or]: [
                    {
                        [and]: [{senderId: ortherUser}, {receiverId: user.id}],
                    },
                    {
                        [and]: [{senderId: user.id}, {receiverId: ortherUser}],
                    },
                ],
            },
            order: [["created_at", "DESC"]],
        });
    },
);
