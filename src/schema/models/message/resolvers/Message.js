export default {
    user: ({userId}, args, {models}) =>
        models.User.findOne({where: {id: userId}}),
};
