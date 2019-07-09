import log from "../../../../utils/logger";
import formatErrors from "../../../../utils/formatErrors";
import {requireAuth} from "../../../../utils/permission";

export default requireAuth.createResolver(
    async (parent, {email, teamId}, {models, user}) => {
        try {
            const memberPromise = models.Member.findOne(
                {where: {teamId, userId: user.id}},
                {raw: true},
            );
            const userToAddPromise = models.User.findOne(
                {where: {email}},
                {raw: true},
            );
            const [member, userToAdd] = await Promise.all([
                memberPromise,
                userToAddPromise,
            ]);

            if (!member.admin) {
                return {
                    ok: false,
                    errors: [
                        {
                            path: "email",
                            message:
                                "You can't add member to a team because yout are not the owner",
                        },
                    ],
                };
            }
            if (!userToAdd) {
                return {
                    ok: false,
                    errors: [
                        {
                            path: "email",
                            message: "No user found for this email",
                        },
                    ],
                };
            }
            await models.Member.create({
                userId: userToAdd.id,
                teamId,
            });
            return {
                ok: true,
            };
        } catch (err) {
            log.error(err);
            return {
                ok: false,
                errors: formatErrors(err, models),
            };
        }
    },
);
