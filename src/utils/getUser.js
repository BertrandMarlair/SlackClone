import {refreshTokens} from "./auth";
import jwt from "jsonwebtoken";

export default async (req, res, next, models) => {
    if (req.headers["x-token"]) {
        const token = req.headers["x-token"].replace("Bearer ", "");

        try {
            const {user} = jwt.verify(token, process.env.SECRET);

            req.user = user;
        } catch (err) {
            const refreshToken = req.headers["x-refresh-token"];
            const newTokens = await refreshTokens(
                token,
                refreshToken.replace("Bearer ", ""),
                models,
                process.env.SECRET,
                process.env.SECRET2,
            );

            if (newTokens.token && newTokens.refreshToken) {
                res.set(
                    "Access-Control-Expose-Headers",
                    "x-token, x-refresh-token",
                );
                res.set("x-token", newTokens.token);
                res.set("x-refresh-token", newTokens.refreshToken);
            }
            req.user = newTokens.user;
        }
    }
    next();
};
