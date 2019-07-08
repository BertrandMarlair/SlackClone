"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.types=void 0;var _gender=_interopRequireDefault(require("./resolvers/gender"));var _timestamp=_interopRequireDefault(require("./resolvers/timestamp"));var _datetime=_interopRequireDefault(require("./resolvers/datetime"));var _hour=_interopRequireDefault(require("./resolvers/hour"));var _graphqlExtraScalars=require("graphql-extra-scalars");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}const types={definitions:`
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
            type: String!
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
    `,resolvers:{Gender:_gender.default,Timestamp:_timestamp.default,DateTime:_datetime.default,Hour:_hour.default,URL:(...args)=>(0,_graphqlExtraScalars.GraphQLURL)(...args),Email:(...args)=>(0,_graphqlExtraScalars.GraphQLEmail)(...args)}};exports.types=types;
//# sourceMappingURL=index.js.map