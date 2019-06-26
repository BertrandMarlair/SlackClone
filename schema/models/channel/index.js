import Channel from "./resolvers/Channel";

export const types = {
    definitions: `
        type Channel {
            id: Int!
            name: String!
            public: Boolean!
            messages: [Message!]!
            users: [User!]!
        }
    `,
    resolvers: {
        Channel,
    },
};

import getChannels from "./resolvers/allChannel";

export const queries = {
    definitions: `
        getChannels: [Channel]
    `,
    resolvers: {
        getChannels,
    },
};

import createChannel from "./resolvers/addChannel";

export const mutations = {
    definitions: `
        createChannel(teamId: Int!, name: String!, public: Boolean=false): Channel
    `,
    resolvers: {
        createChannel,
    },
};

import {
    generateSubscribtionForEvent
} from "../../../utils/pubsub";

export const CHANNEL_ADDED = "CHANNEL_ADDED";
export const CHANNEL_EDITED = "CHANNEL_EDITED";
export const CHANNEL_DELETED = "CHANNEL_DELETED";

export const subscriptions = {
    definitions: `
        channelAdded: Channel
        channelEdited: Channel
        channelDeleted: Int!
    `,
    resolvers: {
        channelAdded: generateSubscribtionForEvent(CHANNEL_ADDED),
        channelEdited: generateSubscribtionForEvent(CHANNEL_EDITED),
        channelDeleted: generateSubscribtionForEvent(CHANNEL_DELETED),
    },
};