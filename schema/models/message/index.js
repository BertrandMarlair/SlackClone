import Message from "./resolvers/Message";

export const types = {
    definitions: `
        type Message {
            id: Int!
            text: String!
            user: User!
            channel: Channel!
        }

    `,
    resolvers: {
        Message,
    },
};

import messages from "./resolvers/allMessage";

export const queries = {
    definitions: `
        messages: [Message]
    `,
    resolvers: {
        messages,
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

import {
    generateSubscribtionForEvent
} from "../../../utils/pubsub";

export const MESSAGE_ADDED = "MESSAGE_ADDED";
export const MESSAGE_EDITED = "MESSAGE_EDITED";
export const MESSAGE_DELETED = "MESSAGE_DELETED";

export const subscriptions = {
    definitions: `
        messageAdded: Message
        messageEdited: Message
        messageDeleted: ID!
    `,
    resolvers: {
        messageAdded: generateSubscribtionForEvent(MESSAGE_ADDED),
        messageEdited: generateSubscribtionForEvent(MESSAGE_EDITED),
        messageDeleted: generateSubscribtionForEvent(MESSAGE_DELETED),
    },
};