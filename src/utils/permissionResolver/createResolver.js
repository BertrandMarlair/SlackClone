export default resolver => {
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
