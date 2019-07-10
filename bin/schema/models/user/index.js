"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.subscriptions=exports.USER_DELETED=exports.USER_EDITED=exports.USER_ADDED=exports.mutations=exports.queries=exports.types=void 0;var _User=_interopRequireDefault(require("./resolvers/User"));var _getCurrentUser=_interopRequireDefault(require("./resolvers/getCurrentUser"));var _getUser=_interopRequireDefault(require("./resolvers/getUser"));var _allUsers=_interopRequireDefault(require("./resolvers/allUsers"));var _registerUser=_interopRequireDefault(require("./resolvers/registerUser"));var _loginUser=_interopRequireDefault(require("./resolvers/loginUser"));var _pubsub=require("../../../utils/pubsub");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}const types={definitions:`
        type User {
            id: Int!
            username: String!
            email: String!
            updatedAt: String!
            teams: [Team!]!
        }

        type RegisterResponse {
            ok: Boolean!
            user: User
            errors: [Error!]
        }

        type LoginResponse {
            ok: Boolean!
            token: String
            refreshToken: String
            errors: [Error!]
        }
    `,resolvers:{User:_User.default}};exports.types=types;const queries={definitions:`
        getCurrentUser: User!
        getUser(id: Int!): User!
        allUsers: [User!]
    `,resolvers:{getCurrentUser:_getCurrentUser.default,getUser:_getUser.default,allUsers:_allUsers.default}};exports.queries=queries;const mutations={definitions:`
        register(username: String!, email: String!, password: String!): RegisterResponse!
        login(email: String!, password: String!): LoginResponse!
    `,resolvers:{register:_registerUser.default,login:_loginUser.default}};exports.mutations=mutations;const USER_ADDED="USER_ADDED";exports.USER_ADDED=USER_ADDED;const USER_EDITED="USER_EDITED";exports.USER_EDITED=USER_EDITED;const USER_DELETED="USER_DELETED";exports.USER_DELETED=USER_DELETED;const subscriptions={definitions:`
        userAdded: User
        userEdited: User
        userDeleted: Int!
    `,resolvers:{userAdded:(0,_pubsub.generateSubscribtionForEvent)(USER_ADDED),userEdited:(0,_pubsub.generateSubscribtionForEvent)(USER_EDITED),userDeleted:(0,_pubsub.generateSubscribtionForEvent)(USER_DELETED)}};exports.subscriptions=subscriptions;
//# sourceMappingURL=index.js.map