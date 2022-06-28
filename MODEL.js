'use strict';
module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
        imageUrl: DataTypes.STRING,
        title: DataTypes.STRING,
        contributor: DataTypes.STRING,
        ingredients: DataTypes.TEXT
    }, {});
    Image.associate = function (models) {
        // associations can be defined here
        Image.belongsTo(models.User, { foreignKey: "userId" })
    };
    return Image;
};
