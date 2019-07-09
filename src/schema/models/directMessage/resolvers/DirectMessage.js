export default {
    sender: ({user, userId}, args, {models}) => {
        if (user) {
            return user;
        }
        return models.User.findOne({where: {id: userId}});
    },
};
