import { requireAuth } from '../../../../utils/permission'

export default requireAuth.createResolver(
    (parents, args, {
        models
    }) => models.Channel.findAll()
)