/* becodeorg/graph
 *
 * /src/schema/commons/resolvers/datetime.js - Commons Resolver: DateTime
 *
 * coded by leny@BeCode
 * started at 10/01/2019
 */

import {DateTime} from "luxon";

export default {
    timestamp(timestamp) {
        return timestamp;
    },
    http(timestamp) {
        return DateTime.fromMillis(timestamp).toHTTP();
    },
    iso(timestamp) {
        const luxon = DateTime.fromMillis(timestamp);

        return {
            datetime: luxon.toISO(),
            date: luxon.toISODate(),
            time: luxon.toISOTime(),
        };
    },
    sql(timestamp) {
        const luxon = DateTime.fromMillis(timestamp);

        return {
            datetime: luxon.toSQL(),
            date: luxon.toSQLDate(),
            time: luxon.toSQLTime(),
        };
    },
};
