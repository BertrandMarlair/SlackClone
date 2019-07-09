export default {
    teams: (parent, args, {models, user}) =>
        models.sequelize.query(
            "select * from teams as team join members as member on team.id = member.team_id where member.user_id = $1",
            {
                bind: [user.id],
                type: models.sequelize.QueryTypes.SELECT,
                raw: true,
            },
        ),
};
