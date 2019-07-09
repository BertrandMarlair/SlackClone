import log from "../../../../utils/logger";
import formatErrors from "../../../../utils/formatErrors";
import {requireAuth} from "../../../../utils/permission";

export default requireAuth.createResolver(
    async (parent, args, {models, user}) => {
        try {
            const response = await models.sequelize.transaction(async () => {
                const team = await models.Team.create({...args});

                await models.Channel.create({
                    name: "general",
                    public: true,
                    teamId: team.id,
                });
                await models.Member.create({
                    teamId: team.id,
                    userId: user.id,
                    admin: true,
                });
                return team;
            });

            return {
                ok: true,
                team: response,
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
