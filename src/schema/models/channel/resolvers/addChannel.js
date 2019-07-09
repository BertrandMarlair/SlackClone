import log from "../../../../utils/logger";
import formatErrors from "../../../../utils/formatErrors";
import {requireAuth} from "../../../../utils/permission";

export default requireAuth.createResolver(
    async (parent, args, {models, user}) => {
        try {
            const member = await models.Member.findOne({
                where: {
                    teamId: args.teamId,
                    userId: user.id,
                },
                raw: true,
            });

            if (!member.admin) {
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
    },
);
