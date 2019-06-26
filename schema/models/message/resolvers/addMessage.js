import log from "../../../../utils/logger";

export default async (parent, args, {
        models,
        user
    }) => models.Message.create({
        ...args,
        userId: user.id
    })
    .then(() => {
        return true
    })
    .catch(err => {
        log.error(err)
        return false
    })