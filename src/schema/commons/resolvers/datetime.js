import {DateTime} from "luxon";

const convertDate = date => {
    const newDate = parseInt(date);

    if (newDate) {
        return newDate;
    }
    return new Date(newDate).getTime();
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
