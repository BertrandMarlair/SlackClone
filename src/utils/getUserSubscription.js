import {refreshTokens} from "./auth";
import jwt from "jsonwebtoken";

export default async (token, refreshToken, models) => {
    const {SECRET, SECRET2} = process.env;

    try {
        const {user} = jwt.verify(token.replace("Bearer ", ""), SECRET);

        return {models, user};
    } catch (err) {
        const newTokens = await refreshTokens(
            token.replace("Bearer ", ""),
            refreshToken.replace("Bearer ", ""),
            models,
            SECRET,
            SECRET2,
        );

        return {models, user: newTokens.user};
    }
};
