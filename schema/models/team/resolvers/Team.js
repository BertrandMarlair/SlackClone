export default {
    channels: ({id}, args, { models }) => {
        console.log(id)
        return models.Channel.findAll({ where: { teamId: id } })
    }
}