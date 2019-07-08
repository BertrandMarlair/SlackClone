import Team from "./resolvers/Team";

import allTeams from "./resolvers/allTeam";
import inviteTeams from "./resolvers/inviteTeams";
import getTeam from "./resolvers/getTeam";

import createTeam from "./resolvers/addTeam";
import addTeamMember from "./resolvers/addTeamMember";

import {generateSubscribtionForEvent} from "../../../utils/pubsub";

export const types = {
    definitions: `
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
    `,
    resolvers: {
        Team,
    },
};

export const queries = {
    definitions: `
        allTeams: [Team!]!
        inviteTeams: [Team!]!
        getTeam(id: Int!): Team!
    `,
    resolvers: {
        allTeams,
        inviteTeams,
        getTeam,
    },
};

export const mutations = {
    definitions: `
        createTeam(name: String!): CreateTeamResponse!
        addTeamMember(email: String!, teamId: Int!): VoidResponse!
    `,
    resolvers: {
        createTeam,
        addTeamMember,
    },
};

export const TEAM_ADDED = "TEAM_ADDED";
export const TEAM_EDITED = "TEAM_EDITED";
export const TEAM_DELETED = "TEAM_DELETED";

export const subscriptions = {
    definitions: `
        teamAdded: Team
        teamEdited: Team
        teamDeleted: ID!
    `,
    resolvers: {
        teamAdded: generateSubscribtionForEvent(TEAM_ADDED),
        teamEdited: generateSubscribtionForEvent(TEAM_EDITED),
        teamDeleted: generateSubscribtionForEvent(TEAM_DELETED),
    },
};
