'use strict';
module.exports = (sequelize, DataTypes) => {
  const exam_year = sequelize.define('exam_year', {
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
    yearId: {
      type: DataTypes.UUID,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'years',
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
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
  exam_year.associate = function(models) {
    exam_year.belongsTo(models.exam_body, {foreignKey: "examBodyId"})
    exam_year.belongsTo(models.year, {foreignKey: "yearId"})
  };
  return exam_year;
};