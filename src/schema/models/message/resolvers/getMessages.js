import { requireAuth } from '../../../../utils/permission'

export default requireAuth.createResolver(
    (parent, args, { models }) => 
        models.Message.findAll({
            where: { channelId: args.channelId },
            order: [['created_at', 'ASC']]
        })
)