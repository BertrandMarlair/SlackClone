import {requireAuth} from "../../../../utils/permission";

export default requireAuth.createResolver((parent, args, {models, user}) =>
    models.Team.findAll(
        {
            where: {
                owner: user.id,
            },
        },
        {
            raw: true,
        },
    ),
);
