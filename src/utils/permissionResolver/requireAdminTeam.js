export default (parent, args, {user}) => {
    if (!user.isAdmin) {
        throw new Error("Requires admin access");
    }
};
