export default {
    channels: ({id}, args, {models}) =>
        models.Channel.findAll({where: {teamId: id}}),
    directMessageMembers: ({id}, args, {models, user}) =>
        models.sequelize.query(
            "select distinct on (u.id) u.id, u.username from users as u join direct_messages as dm on (u.id = dm.sender_id or u.id = receiver_id) where ($1 = dm.sender_id or $1 = dm.receiver_id) and dm.team_id = $2 ",
            {
                bind: [user.id, id],
                type: models.sequelize.QueryTypes.SELECT,
                models: models.User,
                raw: true,
            },
        ),
};
