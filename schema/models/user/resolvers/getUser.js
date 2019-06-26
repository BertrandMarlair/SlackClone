export default (parent, { id }, { models }) => models.User.findOne({ where: { id } }).then(response => {
    console.log(response.dataValues)
    return {
        id: 1,
        username: "mabite"
    }

})