import {requireAuth} from "../../../../utils/permission";

export default requireAuth.createResolver((parent, {id}, {models}) =>
    models.User.findOne({
        where: {id},
    }).then(response => ({
        id: 1,
        username: response.username,
    })),
);
