'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_test = sequelize.define('user_test', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    testId: {
      type: DataTypes.UUID,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'tests',
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    },
    status: {
      type: DataTypes.ENUM("pending", "started", "completed", "failed", "passed", "cancelled"),
      defaultValue: "pending",
      allowNull: false
    },
    score:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isEligible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
  user_test.associate = function(models) {
    user_test.belongsTo(models.user, {foreignKey: "userId"})
    user_test.belongsTo(models.test, {foreignKey: "testId"})
    user_test.belongsToMany(models.test_subject, {through: models.user_test_subject})
    user_test.belongsToMany(models.test_subject, {through: models.user_test_subject})
    // associations can be defined here
  };
  return user_test;
};