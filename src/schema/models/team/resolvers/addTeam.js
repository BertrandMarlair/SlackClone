import log from "../../../../utils/logger";
import formatErrors from '../../../../utils/formatErrors'
import { requireAuth } from '../../../../utils/permission'

export default requireAuth.createResolver(
    async (parent, args, { models, user }) => {
        try {
            const response = await models.sequelize.transaction(
                async () => {
                    const team = await models.Team.create({
                        ...args,
                        owner: user.id
                    })
                    await models.Channel.create({
                        name: 'general',
                        public: true,
                        teamId: team.id
                    })
                    return team
                }
            )
            console.log(response)
            return {
                ok: true,
                team: response
            }
        } catch (err) {
            log.error(err)
            return {
                ok: false,
                errors: formatErrors(err, models)
            }
        }
    }
)