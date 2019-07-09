import {DateTime} from "luxon";

const convertDate = date => {
    const timestamp = parseInt(date);

    if (isNaN(timestamp)) {
        return new Date(date).getTime();
    }
    return timestamp;
};

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
