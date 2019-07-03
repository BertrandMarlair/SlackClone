import { requireAuth } from '../../../../utils/permission'

export default requireAuth.createResolver(
    (parent, args, { models }) => models.User.findAll()
    .then((response) => {
        return response
    })
)