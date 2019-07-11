import requireAuthResolver from "./permissionResolver/requireAuth";
import requireTeamAccessResolver from "./permissionResolver/requireDirectMessageAccess";
import requireDirectMessageAccessResolver from "./permissionResolver/requireDirectMessageAccess";
import requireAdminResolver from "./permissionResolver/requireAdmin";

const createResolver = resolver => {
    const baseResolver = resolver;

    baseResolver.createResolver = childResolver => {
        const newResolver = async (parent, args, context, info) => {
            await resolver(parent, args, context, info);
            return childResolver(parent, args, context, info);
        };

        return createResolver(newResolver);
    };
    return baseResolver;
};

export const requireAuth = createResolver(requireAuthResolver);
export const requireTeamAccess = createResolver(requireTeamAccessResolver);
export const requireDirectMessageAccess = createResolver(
    requireDirectMessageAccessResolver,
);
export const requireAdmin = requireAuth.createResolver(requireAdminResolver);
