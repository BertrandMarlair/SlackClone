import log from "../../../../utils/logger";

export default async (parent, args, {
        models,
        user
    }) => models.Team.create({
        ...args,
        owner: user.id
    })
    .then(() => {
        return true
    })
    .catch(err => {
        log.error(err)
        return false
    })