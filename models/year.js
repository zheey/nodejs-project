'use strict';
module.exports = (sequelize, DataTypes) => {
  const year = sequelize.define('year', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  year.associate = function(models) {
    // associations can be defined here
    year.belongsToMany(models.exam_body, {through: models.exam_year})
  };
  return year;
};