export default {
    channels: ({id}, args, {models}) =>
        models.Channel.findAll({where: {teamId: id}}),
};
