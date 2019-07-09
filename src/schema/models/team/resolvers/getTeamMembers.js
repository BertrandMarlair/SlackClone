import {requireAuth} from "../../../../utils/permission";

export default requireAuth.createResolver((parent, {teamId}, {models}) =>
    models.sequelize.query(
        "select * from users as u join members as m on m.user_id = u.id where m.team_id = $1",
        {
            bind: [teamId],
            type: models.sequelize.QueryTypes.SELECT,
            models: models.User,
            raw: true,
        },
    ),
);
