import Sequelize from 'sequelize';

const sequelize = new Sequelize('slack', 'postgres', 'postgres', {
    dialect: 'postgres',
    operatorsAliases: Sequelize.Op,
    host: process.env.DB_HOST || 'localhost',
    define: {
        underscored: true,
    }
});

const models = {
    User: sequelize.import('./models/user/sequelize/index'),
    Channel: sequelize.import('./models/channel/sequelize/index'),
    Message: sequelize.import('./models/message/sequelize/index'),
    Team: sequelize.import('./models/team/sequelize/index'),
    Member: sequelize.import('./models/member/sequelize/index'),
};

Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models

import {generateTypeDefs, generateResolvers} from "./utils";

import * as channel from "./models/channel/index";
import * as message from "./models/message/index";
import * as user from "./models/user/index";
import * as team from "./models/team/index";
import * as commons from "./commons/index";

const structures = [
    channel,
    message,
    user,
    team,
    commons,
]

export const typeDefs = generateTypeDefs(structures);
export const resolvers = generateResolvers(structures);