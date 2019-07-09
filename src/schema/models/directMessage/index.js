import DirectMessage from "./resolvers/DirectMessage";

import getDirectMessage from "./resolvers/getDirectMessage";

import createDirectMessage from "./resolvers/createDirectMessage";

import directMessageAdded from "./resolvers/directMessageAdded";

export const types = {
    definitions: `
        type DirectMessage {
            id: Int!
            text: String!
            sender: User!
            receiverId: Int!
            createdAt: DateTime!
        }

    `,
    resolvers: {
        DirectMessage,
    },
};

export const queries = {
    definitions: `
        getDirectMessage(teamId: Int!, ortherUser: Int!): [DirectMessage!]!
    `,
    resolvers: {
        getDirectMessage,
    },
};

export const mutations = {
    definitions: `
        createDirectMessage(receiverId: Int!, text: String!, teamId: Int!): Boolean!
    `,
    resolvers: {
        createDirectMessage,
    },
};

export const DIRECT_MESSAGE_ADDED = "DIRECT_MESSAGE_ADDED";

export const subscriptions = {
    definitions: `
        directMessageAdded(receiver: Int!): Message
    `,
    resolvers: {
        directMessageAdded,
    },
};
