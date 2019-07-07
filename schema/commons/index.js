import Gender from "./resolvers/gender";
import Timestamp from "./resolvers/timestamp";
import DateTime from "./resolvers/datetime";
import Hour from "./resolvers/hour";
import {GraphQLEmail, GraphQLURL} from "graphql-extra-scalars";

export const types = {
    definitions: `
        scalar Timestamp
        scalar URL
        scalar Email
        scalar Hour

        enum Gender {
            MALE
            FEMALE
            UNSPECIFIED
            UNKNOWN
        }

        type DateTime {
            timestamp: Timestamp!
            # Conforms to RFC 1123, used in HTTP Headers
            http: String!
            # ISO 8601
            iso: ISODateTime!
            # SQL DateTime
            sql: SQLDateTime!
        }

        type ISODateTime {
            datetime: String!
            date: String!
            time: String!
        }

        type SQLDateTime {
            datetime: String!
            date: String!
            time: String!
        }

        type Language {
            code: String!
            name: String!
        }

        type Address {
            street: String!
            number: String!
            zip: String!
            city: String!
            coords: GeoCoordinates!
        }

        type GeoCoordinates {
            latitude: Float!
            longitude: Float!
        }

        type Error {
            path: String!
            message: String
        }

        type VoidResponse {
            ok: Boolean!
            errors: [Error!]
        }
    `,
    resolvers: {
        Gender,
        Timestamp,
        DateTime,
        Hour,
        URL: (...args) => GraphQLURL(...args), // eslint-disable-line new-cap
        Email: (...args) => GraphQLEmail(...args), // eslint-disable-line new-cap
    },
};
