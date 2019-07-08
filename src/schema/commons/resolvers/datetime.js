/* becodeorg/graph
 *
 * /src/schema/commons/resolvers/datetime.js - Commons Resolver: DateTime
 *
 * coded by leny@BeCode
 * started at 10/01/2019
 */

import {DateTime} from "luxon";

const convertDate = (date) => {
    if (parseInt(date, 10)){
        return date
    }else{
        return new Date(date).getTime()
    }
}

export default {
    timestamp(timestamp) {
        return convertDate(timestamp);
    },
    http(timestamp) {
        return DateTime.fromMillis(convertDate(timestamp)).toHTTP();
    },
    iso(timestamp) {
        const luxon = DateTime.fromMillis(convertDate(timestamp));

        return {
            datetime: luxon.toISO(),
            date: luxon.toISODate(),
            time: luxon.toISOTime(),
        };
    },
    sql(timestamp) {
        const luxon = DateTime.fromMillis(convertDate(timestamp));

        return {
            datetime: luxon.toSQL(),
            date: luxon.toSQLDate(),
            time: luxon.toSQLTime(),
        };
    },
};
