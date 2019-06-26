import Team from "./resolvers/Team";

export const types = {
    definitions: `
        type Team {
            owner: User!
            members: [User!] !
            channel: [Channel!] !
        }

    `,
    resolvers: {
        Team,
    },
};

import teams from "./resolvers/allTeam";

export const queries = {
    definitions: `
        teams: [Team]
    `,
    resolvers: {
        teams,
    },
};

import createTeam from "./resolvers/addTeam";

export const mutations = {
    definitions: `
        createTeam(name: String!): Boolean
    `,
    resolvers: {
        createTeam,
    },
};

import {
    generateSubscribtionForEvent
} from "../../../utils/pubsub";

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