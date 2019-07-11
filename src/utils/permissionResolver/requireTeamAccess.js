export default async (parent, {channelId}, {user, models}) => {
    if (!user || !user.id) {
        throw new Error("Not authenticated");
    }
    const channel = await models.Channel.findOne({
        where: {id: channelId},
    });
    const member = await models.Member.findOne({
        where: {teamId: channel.teamId, userId: user.id},
    });

    if (!member) {
        throw new Error(
            "You have to be a memeber to the team for get the messages",
        );
    }
};
