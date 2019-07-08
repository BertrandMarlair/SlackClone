import { requireAuth } from '../../../../utils/permission'

export default requireAuth.createResolver(
    (parent, {
        id
    }, {
        models
    }) => models.Team.findOne({
        where: {
            id
        }
    })
)