export default {
    sender: ({sender, senderId}, args, {models}) => {
        if (sender) {
            return sender;
        }
        return models.User.findOne({where: {id: senderId}});
    },
};
