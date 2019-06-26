import User from "./resolvers/User";

export const types = {
    definitions: `
        type User {
            id: Int!
            username: String!
            email: String!
            updatedAt: String!
            teams: [Team!]!
        }
    `,
    resolvers: {
        User,
    },
};

import getUser from "./resolvers/getUser";
import allUsers from "./resolvers/allUsers";

export const queries = {
    definitions: `
        getUser(id: Int!): User!
        allUsers: [User!]
    `,
    resolvers: {
        getUser,
        allUsers,
    },
};

import createUser from "./resolvers/addUser";

export const mutations = {
    definitions: `
        createUser(username: String!, email: String!, password: String!): User!
    `,
    resolvers: {
        createUser,
    },
};

import {
    generateSubscribtionForEvent
} from "../../../utils/pubsub";

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