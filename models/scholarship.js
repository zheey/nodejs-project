'use strict';
module.exports = (sequelize, DataTypes) => {
  const scholarship = sequelize.define('scholarship', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hasPaid: {
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
  scholarship.associate = function(models) {
    // associations can be defined here
    scholarship.belongsTo(models.test, {foreignKey: "testId"})
    scholarship.belongsTo(models.user, {as: "sponsor",foreignKey: "userId"})
  };
  return scholarship;
};