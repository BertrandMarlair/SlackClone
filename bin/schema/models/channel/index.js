"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.subscriptions=exports.CHANNEL_DELETED=exports.CHANNEL_EDITED=exports.CHANNEL_ADDED=exports.mutations=exports.queries=exports.types=void 0;var _Channel=_interopRequireDefault(require("./resolvers/Channel"));var _allChannel=_interopRequireDefault(require("./resolvers/allChannel"));var _getChannelById=_interopRequireDefault(require("./resolvers/getChannelById"));var _addChannel=_interopRequireDefault(require("./resolvers/addChannel"));var _pubsub=require("../../../utils/pubsub");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}const types={definitions:`
        type Channel {
            id: Int!
            name: String!
            public: Boolean!
            messages: [Message!]!
            users: [User!]!
        }

        type ResponseCreateChannel {
            ok: Boolean!
            channel: Channel
            errors: [Error!]
        }
    `,resolvers:{Channel:_Channel.default}};exports.types=types;const queries={definitions:`
        getChannels: [Channel]
        getChannelById(id: Int!, teamId: Int!): Channel!
    `,resolvers:{getChannels:_allChannel.default,getChannelById:_getChannelById.default}};exports.queries=queries;const mutations={definitions:`
        createChannel(teamId: Int!, name: String!, public: Boolean = false): ResponseCreateChannel
    `,resolvers:{createChannel:_addChannel.default}};exports.mutations=mutations;const CHANNEL_ADDED="CHANNEL_ADDED";exports.CHANNEL_ADDED=CHANNEL_ADDED;const CHANNEL_EDITED="CHANNEL_EDITED";exports.CHANNEL_EDITED=CHANNEL_EDITED;const CHANNEL_DELETED="CHANNEL_DELETED";exports.CHANNEL_DELETED=CHANNEL_DELETED;const subscriptions={definitions:`
        channelAdded: Channel
        channelEdited: Channel
        channelDeleted: Int!
    `,resolvers:{channelAdded:(0,_pubsub.generateSubscribtionForEvent)(CHANNEL_ADDED),channelEdited:(0,_pubsub.generateSubscribtionForEvent)(CHANNEL_EDITED),channelDeleted:(0,_pubsub.generateSubscribtionForEvent)(CHANNEL_DELETED)}};exports.subscriptions=subscriptions;
//# sourceMappingURL=index.js.map