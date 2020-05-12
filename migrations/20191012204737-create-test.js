'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tests', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      examBodyId: {
        type: Sequelize.UUID,
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
        type: Sequelize.STRING,
        allowNull: false
      },
      cutoff: {
        type: Sequelize.STRING,
        allowNull: true
      },
      subject_quantity: {
        type: Sequelize.STRING,
        allowNull: false
      },
      scoring_type: {
        type: Sequelize.ENUM("subject-based", "overall"),
        allowNull: false,
      },
      deadline: {
        allowNull: false,
        type: Sequelize.DATE
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      isActive: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tests');
  }
};