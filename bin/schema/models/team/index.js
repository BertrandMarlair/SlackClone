"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.subscriptions=exports.TEAM_DELETED=exports.TEAM_EDITED=exports.TEAM_ADDED=exports.mutations=exports.queries=exports.types=void 0;var _Team=_interopRequireDefault(require("./resolvers/Team"));var _allTeam=_interopRequireDefault(require("./resolvers/allTeam"));var _inviteTeams=_interopRequireDefault(require("./resolvers/inviteTeams"));var _getTeam=_interopRequireDefault(require("./resolvers/getTeam"));var _addTeam=_interopRequireDefault(require("./resolvers/addTeam"));var _addTeamMember=_interopRequireDefault(require("./resolvers/addTeamMember"));var _pubsub=require("../../../utils/pubsub");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}const types={definitions:`
        type Team {
            id: Int!
            name: String!
            owner: Int!
            members: [User!]!
            channels: [Channel!]
        }

        type CreateTeamResponse {
            ok: Boolean!
            team: Team
            errors: [Error!]
        }
    `,resolvers:{Team:_Team.default}};exports.types=types;const queries={definitions:`
        allTeams: [Team!]!
        inviteTeams: [Team!]!
        getTeam(id: Int!): Team!
    `,resolvers:{allTeams:_allTeam.default,inviteTeams:_inviteTeams.default,getTeam:_getTeam.default}};exports.queries=queries;const mutations={definitions:`
        createTeam(name: String!): CreateTeamResponse!
        addTeamMember(email: String!, teamId: Int!): VoidResponse!
    `,resolvers:{createTeam:_addTeam.default,addTeamMember:_addTeamMember.default}};exports.mutations=mutations;const TEAM_ADDED="TEAM_ADDED";exports.TEAM_ADDED=TEAM_ADDED;const TEAM_EDITED="TEAM_EDITED";exports.TEAM_EDITED=TEAM_EDITED;const TEAM_DELETED="TEAM_DELETED";exports.TEAM_DELETED=TEAM_DELETED;const subscriptions={definitions:`
        teamAdded: Team
        teamEdited: Team
        teamDeleted: ID!
    `,resolvers:{teamAdded:(0,_pubsub.generateSubscribtionForEvent)(TEAM_ADDED),teamEdited:(0,_pubsub.generateSubscribtionForEvent)(TEAM_EDITED),teamDeleted:(0,_pubsub.generateSubscribtionForEvent)(TEAM_DELETED)}};exports.subscriptions=subscriptions;
//# sourceMappingURL=index.js.map