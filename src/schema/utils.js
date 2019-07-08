const parseDefinitions = (arr, key) =>
    arr.map(({[key]: {definitions = ""} = {}}) => definitions).join("\n");

export const generateTypeDefs = models => `
    ${parseDefinitions(models, "types")}

    type Query {
        ${parseDefinitions(models, "queries")}
    }

    type Mutation {
        ${parseDefinitions(models, "mutations")}
    }

    type Subscription {
        ${parseDefinitions(models, "subscriptions")}
    }
`;

export const generateResolvers = models => {
    let resolvers = {
        Query: {},
        Mutation: {},
        Subscription: {},
    };

    models.forEach(
        ({types = {}, queries = {}, mutations = {}, subscriptions = {}}) => {
            if (types.resolvers) {
                resolvers = {
                    ...resolvers,
                    ...types.resolvers,
                };
            }
            if (queries.resolvers) {
                resolvers.Query = {
                    ...resolvers.Query,
                    ...queries.resolvers,
                };
            }
            if (mutations.resolvers) {
                resolvers.Mutation = {
                    ...resolvers.Mutation,
                    ...mutations.resolvers,
                };
            }
            if (subscriptions.resolvers) {
                resolvers.Subscription = {
                    ...resolvers.Subscription,
                    ...subscriptions.resolvers,
                };
            }
        },
    );

    return resolvers;
};

export const arangoElementResolver = {
    id({_key}) {
        return _key;
    },
};
