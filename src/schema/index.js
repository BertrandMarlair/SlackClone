import Sequelize from "sequelize";
import log from "../utils/logger";

import {generateTypeDefs, generateResolvers} from "./utils";

import * as channel from "./models/channel/index";
import * as message from "./models/message/index";
import * as user from "./models/user/index";
import * as team from "./models/team/index";
import * as directMessage from "./models/directMessage/index";
import * as commons from "./commons/index";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const Op = Sequelize.Op;
const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col,
};

export default async () => {
    let maxReconnect = 20,
        connected = false;
    const sequelize = new Sequelize("slack", "postgres", "postgres", {
        dialect: "postgres",
        operatorsAliases,
        host: process.env.DB_HOST || "localhost",
        define: {
            underscored: true,
        },
    });

    while (!connected && maxReconnect) {
        try {
            await sequelize.authenticate();
            connected = true;
        } catch (err) {
            log.error("reconnecting in 5 seconds");
            maxReconnect--;
            await sleep(5000);
        }
    }

    if (!connected) {
        return null;
    }

    const models = {
        User: sequelize.import("./models/user/sequelize/index"),
        Channel: sequelize.import("./models/channel/sequelize/index"),
        Message: sequelize.import("./models/message/sequelize/index"),
        Team: sequelize.import("./models/team/sequelize/index"),
        Member: sequelize.import("./models/member/sequelize/index"),
        DirectMessage: sequelize.import(
            "./models/directMessage/sequelize/index",
        ),
    };

    Object.keys(models).forEach(modelName => {
        if ("associate" in models[modelName]) {
            models[modelName].associate(models);
        }
    });

    models.sequelize = sequelize;
    models.Sequelize = Sequelize;

    return models;
};

const structures = [channel, message, user, team, directMessage, commons];

export const typeDefs = generateTypeDefs(structures);
export const resolvers = generateResolvers(structures);
