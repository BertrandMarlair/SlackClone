import Message from "./resolvers/Message";

export const types = {
    definitions: `
        type Message {
            id: Int!
            text: String!
            user: User!
            channel: Channel!
            createdAt: DateTime!
        }

    `,
    resolvers: {
        Message,
    },
};

import getMessages from "./resolvers/getMessages";

export const queries = {
    definitions: `
        getMessages(channelId: Int!): [Message!]
    `,
    resolvers: {
        getMessages,
    },
};

import createMessage from "./resolvers/addMessage";

export const mutations = {
    definitions: `
        createMessage(channelId: Int!, text: String!): Boolean
    `,
    resolvers: {
        createMessage,
    },
};

import {generateSubscribtionForEvent} from "../../../utils/pubsub";

export const MESSAGE_ADDED = "MESSAGE_ADDED";
export const MESSAGE_EDITED = "MESSAGE_EDITED";
export const MESSAGE_DELETED = "MESSAGE_DELETED";

import messageAdded from './resolvers/messageAddedSub'

export const subscriptions = {
    definitions: `
        messageAdded(channelId: Int!): Message
        messageEdited: Message
        messageDeleted: ID!
    `,
    resolvers: {
        messageAdded,
        // messageAdded: generateSubscribtionForEvent(MESSAGE_ADDED),
        messageEdited: generateSubscribtionForEvent(MESSAGE_EDITED),
        messageDeleted: generateSubscribtionForEvent(MESSAGE_DELETED),
    },
};