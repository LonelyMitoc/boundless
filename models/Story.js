const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Story extends Model {}

Story.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    checked_out: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    upvotes_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contributors: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    creator_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Story',
  }
);

module.exports = Story;
