import {requireAuth} from "../../../../utils/permission";

export default requireAuth.createResolver((parents, {id, teamId}, {models}) =>
    models.Channel.findOne({
        where: {
            id,
            teamId,
        },
    }),
);
