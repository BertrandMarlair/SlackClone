export default (sequelize, DataTypes) => {
    const Channel = sequelize.define("channel", {
        name: {
            type: DataTypes.STRING,
            validate: {
                isAlphanumeric: {
                    args: true,
                    msg:
                        "The name of the channel can only contain lettres ans numbers",
                },
                len: {
                    args: [3, 25],
                    msg:
                        "The name of the channel needs to be between 3 and 25 characters long",
                },
            },
        },
        public: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    });

    Channel.associate = models => {
        // 1:M
        Channel.belongsTo(models.Team, {
            foreignKey: {
                name: "teamId",
                field: "team_id",
            },
        });
        // n:M
        Channel.belongsToMany(models.User, {
            through: "channel_member",
            foreignKey: {
                name: "channelId",
                field: "channel_id",
            },
        });
    };

    return Channel;
};
