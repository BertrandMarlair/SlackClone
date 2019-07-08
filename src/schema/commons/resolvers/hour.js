import {GraphQLScalarType} from "graphql";

const HOUR_MATCHER = /^[0-2][0-9]:[0-5][0-9]$/i;

export default new GraphQLScalarType({
    name: "Hour",
    description: "Hour, in hh:mm format",
    serialize(value) {
        if (typeof value !== "string" || !HOUR_MATCHER.test(value)) {
            throw new Error("Hour isn't a valid HH:MM format value");
        }
        return value;
    },
    parseValue(value) {
        if (typeof value !== "string" || !HOUR_MATCHER.test(value)) {
            throw new Error("Hour isn't a valid HH:MM format value");
        }
        return value;
    },
    parseLiteral({value}) {
        return this.parseValue(value);
    },
});
