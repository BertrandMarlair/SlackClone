export default {
    channels: ({id}, args, { models }) => {
        return models.Channel.findAll({ where: { teamId: id } })
    }
}