import _ from "lodash";

const formatErrors = (err, models) => {
    if (err instanceof models.Sequelize.ValidationError) {
        return err.errors.map(x => _.pick(x, ["path", "message"]));
    }
    return [{path: "name", message: "something went wrong"}];
};

export default formatErrors;
