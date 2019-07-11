export default (parent, args, {user}) => {
    if (!user || !user.id) {
        throw new Error("Not authenticated");
    }
};
