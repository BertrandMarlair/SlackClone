import log from "../../../../utils/logger";
import formatErrors from "../../../../utils/formatErrors";

export default async (parent, args, {models}) => {
    try {
        const user = await models.User.create(args);

        return {
            ok: true,
            user,
        };
    } catch (err) {
        log.error(err);
        return {
            ok: false,
            errors: formatErrors(err, models),
        };
    }
};
