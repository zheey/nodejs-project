'use strict';
module.exports = (sequelize, DataTypes) => {
  const test_subject = sequelize.define('test_subject', {
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
    subjectId: {
      type: DataTypes.UUID,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'subjects',
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    },
    cutoff: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    questionSize: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isCompulsory: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
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
  test_subject.associate = function(models) {
    // associations can be defined here
    test_subject.belongsTo(models.exam_body, {foreignKey: "examBodyId"})
    test_subject.belongsTo(models.subject, {foreignKey: "subjectId"})
    test_subject.belongsToMany(models.user_test, {through: models.user_test_subject})

  };
  return test_subject;
};