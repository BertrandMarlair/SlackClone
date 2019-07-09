import {requireAuth} from "../../../../utils/permission";

export default requireAuth.createResolver((parent, args, {models, user}) =>
    models.User.findOne({
        where: {
            id: user.id,
        },
    }).then(response => ({
        id: 1,
        username: response.username,
    })),
);
