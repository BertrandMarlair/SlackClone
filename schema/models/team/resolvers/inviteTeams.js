import { requireAuth } from '../../../../utils/permission'

export default requireAuth.createResolver(
    (parent, args, {
        models,
        user
    }) => models.Team.findAll({
        include: [{
            model: models.User,
            where: { id: user.id },
        }]
    }, {
        raw: true
    })

)