'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: {
      allowedNull: false,
      type: DataTypes.INTEGER,
      references: { model: "Users" }
    },
    imageId: {
      allowedNull: false,
      type: DataTypes.INTEGER,
      references: { model: "Images" }
    },
    content: {
      allowedNull: false,
      type: DataTypes.TEXT
    }
  }, {});
  Comment.associate = function (models) {
    // associations can be defined here
    Comment.belongsTo(models.User, { foreignKey: "userId" })
    Comment.belongsTo(models.Image, { foreignKey: "imageId" })

  };
  return Comment;
};
