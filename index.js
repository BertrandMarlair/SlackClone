import express from 'express';
import http from "http";
import bodyParser from "body-parser";
import {express as voyagerMiddleware} from "graphql-voyager/middleware";
import models from './schema/index';
import log from "./utils/logger";
import {ApolloServer} from 'apollo-server-express';
import {makeExecutableSchema} from "graphql-tools";
import { typeDefs, resolvers } from './schema/index';
import 'dotenv/config';

const app = express();
const httpServer = http.createServer(app);

app.use("/map", voyagerMiddleware({endpointUrl: `http://localhost:${process.env.PORT}/`}));
app.use(bodyParser.text({type: "application/graphql"}));

const createServer = () =>
    new ApolloServer({
        schema: makeExecutableSchema({
            typeDefs,
            resolvers,
            // schemaDirectives,
        }),
        context: {
            models,
            user: {
                id: 1
            }
        }
        // playground,
        // context: ({
        //     req,
        //     connection,
        // }) => ({
        //     headers: connection ? connection.context : req.headers, models
        // }),
        // tracing,
    });

createServer(true, true).applyMiddleware({app, path: "/explore"});

models.sequelize.sync({force: false}).then(() => {
    const endpoint = createServer();

    endpoint.installSubscriptionHandlers(httpServer);
    endpoint.applyMiddleware({app, path: "/"});

    httpServer.listen(process.env.PORT, () => log.info(`Server ready. -> start on http://localhost:${process.env.PORT}/`));
})