import {requireAuth} from "../../../../utils/permission";

export default requireAuth.createResolver((parent, {id}, {models}) =>
    models.DirectMessage.findAll({
        where: {
            id,
        },
    }),
);
