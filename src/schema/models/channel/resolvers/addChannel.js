import log from "../../../../utils/logger";
import formatErrors from "../../../../utils/formatErrors";
import {requireAuth} from "../../../../utils/permission";
import {userInfo} from "os";

export default requireAuth.createResolver(async (parent, args, {models}) => {
    try {
        const team = await models.Team.findOne({where: {id: args.teamId}});

        if (team.ower === userInfo.id) {
            return {
                ok: false,
                errors: [
                    {
                        path: "name",
                        message:
                            "You have to be owner of the team for create channel",
                    },
                ],
            };
        }
        const channel = await models.Channel.create(args);

        return {
            ok: true,
            channel,
        };
    } catch (err) {
        log.error(err);
        return {
            ok: false,
            errors: formatErrors(err, models),
        };
    }
});
