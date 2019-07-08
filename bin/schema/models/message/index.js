"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.subscriptions=exports.MESSAGE_DELETED=exports.MESSAGE_EDITED=exports.MESSAGE_ADDED=exports.mutations=exports.queries=exports.types=void 0;var _Message=_interopRequireDefault(require("./resolvers/Message"));var _getMessages=_interopRequireDefault(require("./resolvers/getMessages"));var _addMessage=_interopRequireDefault(require("./resolvers/addMessage"));var _pubsub=require("../../../utils/pubsub");var _messageAddedSub=_interopRequireDefault(require("./resolvers/messageAddedSub"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}const types={definitions:`
        type Message {
            id: Int!
            text: String!
            user: User!
            channel: Channel!
            createdAt: DateTime!
        }

    `,resolvers:{Message:_Message.default}};exports.types=types;const queries={definitions:`
        getMessages(channelId: Int!): [Message!]
    `,resolvers:{getMessages:_getMessages.default}};exports.queries=queries;const mutations={definitions:`
        createMessage(channelId: Int!, text: String!): Boolean
    `,resolvers:{createMessage:_addMessage.default}};exports.mutations=mutations;const MESSAGE_ADDED="MESSAGE_ADDED";exports.MESSAGE_ADDED=MESSAGE_ADDED;const MESSAGE_EDITED="MESSAGE_EDITED";exports.MESSAGE_EDITED=MESSAGE_EDITED;const MESSAGE_DELETED="MESSAGE_DELETED";exports.MESSAGE_DELETED=MESSAGE_DELETED;const subscriptions={definitions:`
        messageAdded(channelId: Int!): Message
        messageEdited: Message
        messageDeleted: ID!
    `,resolvers:{messageAdded:_messageAddedSub.default,messageEdited:(0,_pubsub.generateSubscribtionForEvent)(MESSAGE_EDITED),messageDeleted:(0,_pubsub.generateSubscribtionForEvent)(MESSAGE_DELETED)}};exports.subscriptions=subscriptions;
//# sourceMappingURL=index.js.map