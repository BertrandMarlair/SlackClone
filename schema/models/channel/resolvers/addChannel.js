import log from "../../../../utils/logger";

export default (parent, args, { models }) => models.Channel.create(args)
.then(response => {
    return response
}).catch(err => {
    log.error(err)
})