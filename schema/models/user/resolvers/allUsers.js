export default (parent, args, { models }) => models.User.findAll().then((response) => {
    console.log(response)
    return response
})