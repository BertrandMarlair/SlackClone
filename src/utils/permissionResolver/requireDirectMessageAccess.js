export default async (parent, {teamId, userId}, {user, models}) => {
    if (!user || !user.id) {
        throw new Error("Not authenticated");
    }

    const {or} = models.Sequelize.Op;

    const members = await models.Member.findAll({
        where: {
            teamId,
            [or]: [{userId: user.id}, {userId}],
        },
    });

    if (members.length !== 2) {
        throw new Error(
            "You have to be a memeber to the team for get the messages",
        );
    }
};
