'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_test_subject = sequelize.define('user_test_subject', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userTestId: {
      type: DataTypes.UUID,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'user_tests',
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    },
    testSubjectId: {
      type: DataTypes.UUID,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'test_subjects',
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    },
    status:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      DefaultValue: false
    },
    score:{
      type: DataTypes.INTEGER,
      allowNull: false,
      DefaultValue: 0
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
  user_test_subject.associate = function(models) {
    // associations can be defined here
    user_test_subject.belongsTo(models.user_test, {foreignKey: "userTestId"});
    user_test_subject.belongsTo(models.test_subject, {foreignKey: "testSubjectId"});
  };
  return user_test_subject;
};