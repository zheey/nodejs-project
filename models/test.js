'use strict';
module.exports = (sequelize, DataTypes) => {
  const test = sequelize.define('test', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    examBodyId: {
      type: DataTypes.UUID,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'exam_bodies',
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cutoff: {
      type: DataTypes.STRING,
      allowNull: true
    },
    subject_quantity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    scoring_type: {
      type: DataTypes.ENUM("subject-based", "overall"),
      allowNull: false,
    },
    deadline: {
      allowNull: false,
      type: DataTypes.DATE
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    isActive: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true
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
  test.associate = function(models) {
    // associations can be defined here
    test.belongsTo(models.exam_body, {foreignKey: "examBodyId"})
    test.hasMany(models.scholarship)
    test.belongsToMany(models.user, {through: models.user_test})
  };
  return test;
};