import User from "./resolvers/User";

import getCurrentUser from "./resolvers/getCurrentUser";
import getUser from "./resolvers/getUser";
import allUsers from "./resolvers/allUsers";

import register from "./resolvers/registerUser";
import login from "./resolvers/loginUser";

import {generateSubscribtionForEvent} from "../../../utils/pubsub";

export const types = {
    definitions: `
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
    `,
    resolvers: {
        User,
    },
};

export const queries = {
    definitions: `
        getCurrentUser: User!
        getUser(id: Int!): User!
        allUsers: [User!]
    `,
    resolvers: {
        getCurrentUser,
        getUser,
        allUsers,
    },
};

export const mutations = {
    definitions: `
        register(username: String!, email: String!, password: String!): RegisterResponse!
        login(email: String!, password: String!): LoginResponse!
    `,
    resolvers: {
        register,
        login,
    },
};

export const USER_ADDED = "USER_ADDED";
export const USER_EDITED = "USER_EDITED";
export const USER_DELETED = "USER_DELETED";

export const subscriptions = {
    definitions: `
        userAdded: User
        userEdited: User
        userDeleted: Int!
    `,
    resolvers: {
        userAdded: generateSubscribtionForEvent(USER_ADDED),
        userEdited: generateSubscribtionForEvent(USER_EDITED),
        userDeleted: generateSubscribtionForEvent(USER_DELETED),
    },
};
