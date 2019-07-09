import {requireAuth} from "../../../../utils/permission";

export default requireAuth.createResolver(
    (parent, {receiver}, {models, user}) =>
        models.DirectMessage.findAll({
            where: {receiver, sender: user.id},
            order: [["created_at", "DESC"]],
        }),
);
