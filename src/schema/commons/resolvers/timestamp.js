/* becodeorg/graph
 *
 * /src/schema/commons/resolvers/timestamp.js - Commons Resolver: Timestamp Scalar
 *
 * coded by leny@BeCode
 * started at 04/01/2019
 */

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
