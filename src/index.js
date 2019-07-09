import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import {express as voyagerMiddleware} from "graphql-voyager/middleware";
import getModels from "./schema/index";
import log from "./utils/logger";
import {ApolloServer} from "apollo-server-express";
import {makeExecutableSchema} from "graphql-tools";
import {typeDefs, resolvers} from "./schema/index";
import getUser from "./utils/getUser";
import getUserSubscription from "./utils/getUserSubscription";
import "dotenv/config";

const app = express();
const httpServer = http.createServer(app);

let corsOptions = {
    origin: "*",
    credentials: true,
};

app.use(cors(corsOptions));

app.use(
    "/map",
    voyagerMiddleware({endpointUrl: `http://localhost:${process.env.PORT}/`}),
);
app.use(bodyParser.text({type: "application/graphql"}));

getModels().then(models => {
    if (!models) {
        log.error("Could not connect to server");
        return null;
    }

    app.use((req, res, next) => getUser(req, res, next, models));

    const createServer = () =>
        new ApolloServer({
            schema: makeExecutableSchema({
                typeDefs,
                resolvers,
                // schemaDirectives,
            }),
            context: async ({req, connection}) => {
                if (connection) {
                    // check connection for metadata
                    return {
                        models: connection.context.models,
                        SECRET: process.env.SECRET,
                        SECRET2: process.env.SECRET2,
                        user: req ? req.user : connection.context.user,
                    };
                }

                return {
                    models,
                    SECRET: process.env.SECRET,
                    SECRET2: process.env.SECRET2,
                    user: req && req.user,
                };
            },
            subscriptions: {
                onConnect: connectionParams => {
                    const {token, refreshToken} = connectionParams;

                    if (token && refreshToken) {
                        return getUserSubscription(token, refreshToken, models);
                    }

                    return {models};
                },
                // onDisconnect: webSocket => {

                // },
            },
        });

    createServer(true, true).applyMiddleware({app, path: "/explore"});
    models.sequelize.sync({force: false}).then(() => {
        const endpoint = createServer();

        endpoint.installSubscriptionHandlers(httpServer);
        endpoint.applyMiddleware({app, path: "/"});

        httpServer.listen(process.env.PORT, () =>
            log.info(
                `Server ready. -> start on http://localhost:${process.env.PORT}/`,
            ),
        );
    });
});
