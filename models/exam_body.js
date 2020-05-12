'use strict';
module.exports = (sequelize, DataTypes) => {
  const exam_body = sequelize.define('exam_body', {
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
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true
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
  exam_body.associate = function(models) {
    // associations can be defined here
    exam_body.belongsToMany(models.year, {through: models.exam_year})
    exam_body.hasMany(models.test)
    exam_body.belongsToMany(models.subject, {through: models.test_subject})

  };
  return exam_body;
};