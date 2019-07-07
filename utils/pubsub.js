import {RedisPubSub} from "graphql-redis-subscriptions";

const {REDIS_HOST, REDIS_PORT} = process.env;

const pubsub = new RedisPubSub({
    connection: {
        host: REDIS_HOST,
        port: REDIS_PORT,
        retry_strategy({attempt}) {
            return Math.max(attempt * 100, 3000);
        },
    },
});

export default pubsub;

export const generateSubscribtionForEvent = (...events) => ({
    subscribe: () => pubsub.asyncIterator(events),
});
