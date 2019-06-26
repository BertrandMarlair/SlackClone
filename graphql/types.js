import { gql } from 'apollo-server-express';

const TypeDefs = gql`
    type Channel {
        id: Int!
        name: String!
        public: Boolean!
    }
    type Query {
        hi: String
        channels: [Channel]
    }
    type Mutation {
        createChannel(name: String!): Channel
        editChannel(id: Int!, name: String!): Channel
        deleteChannel(id: Int!): Int!
    }
    # type Subscription {

    # }
`;

export default TypeDefs;

// type Team {
//     owner: User!
//         members: [User!] !
//         channel: [Channel!] !
// }

// type Channel {
//     id: Int!
//         name: String!
//         public: Boolean!
//         message: [Message!] !
//         users: [User!] !
// }

// type Message {
//     id: Int!
//     text: String!
//     user: User!
//     channel: Channel!
// }

// type User {
//     id: Int!
//         username: String!
//         email: String!
//         teams: [Team!] !
// }

// type Query {
//     hi: String
// }