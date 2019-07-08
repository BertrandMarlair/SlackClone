export default {
    user: ({ userId }, args, { models }) => {
        return models.User.findOne({ where: { id: userId } })
    }
}