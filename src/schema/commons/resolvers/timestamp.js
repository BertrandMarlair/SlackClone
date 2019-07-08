import {GraphQLScalarType} from "graphql";

export default new GraphQLScalarType({
    name: "Timestamp",
    description: "Unix Milliseconds Timestamp",
    serialize(value) {
        if (isNaN(value)) {
            throw new Error("Timestamp isn't a valid timestamp value");
        }
        return value;
    },
    parseValue(value) {
        if (isNaN(parseFloat(value))) {
            throw new Error("Timestamp isn't a valid timestamp value");
        }
        return parseFloat(value);
    },
    parseLiteral({value}) {
        return this.parseValue(value);
    },
});
