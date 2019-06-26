export default (parent, args, {
    models
}) => models.Message.findAll()