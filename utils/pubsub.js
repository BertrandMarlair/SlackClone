// import {RedisPubSub} from "graphql-redis-subscriptions";

// const pubsub = new RedisPubSub({
//     connection: {
//         host: 'redis',
//         port: '6379',
//         retry_strategy({attempt}) {
//             return Math.max(attempt * 100, 3000);
//         },
//     },
// });

// export default pubsub;

export const generateSubscribtionForEvent = () => ({
    subscribe: () => 'pubsub.asyncIterator(events)',
});
