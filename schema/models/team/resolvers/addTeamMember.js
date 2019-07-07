import log from "../../../../utils/logger";
import formatErrors from '../../../../utils/formatErrors'
import { requireAuth } from '../../../../utils/permission'

export default requireAuth.createResolver(
    async (parent, { email, teamId }, { models, user }) => {
        try {
            const teamPromise = models.Team.findOne({ where: { id: teamId }}, { raw: true })
            const userToAddPromise = models.User.findOne({ where: { email } }, { raw: true })
            const [ team, userToAdd ] = await Promise.all([teamPromise, userToAddPromise])
            if(team.owner !== user.id){
                return {
                    ok: false,
                    errors: [{path: 'email', message: "You can't add member to a team because yout are not the owner"}]
                }
            }
            if (!userToAdd){
                return {
                    ok: false,
                    errors: [{path: 'email', message: "No user found for this email"}]
                }
            }
            console.log(userToAdd.id, teamId)
            await models.Member.create({
                userId: userToAdd.id,
                teamId
            })
            return {
                ok: true,
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