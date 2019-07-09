export default (sequelize, DataTypes) => {
    const Team = sequelize.define("team", {
        name: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isAlphanumeric: {
                    args: true,
                    msg:
                        "The name of the team can only contain lettres ans numbers",
                },
                len: {
                    args: [3, 25],
                    msg:
                        "The name of the team needs to be between 3 and 25 characters long",
                },
            },
        },
    });

    Team.associate = models => {
        Team.belongsToMany(models.User, {
            through: models.Member,
            foreignKey: {
                name: "teamId",
                field: "team_id",
            },
        });
    };

    return Team;
};
