const Sequelize = require('sequelize');
const db = require('../db');

const Student = db.define("student", {
  firstname: {
    type: Sequelize.STRING,
    allowNull: false
  },

  lastname: {
    type: Sequelize.STRING,
    allowNull: false
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },

  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://via.placeholder.com/150"
  },

  gpa: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0,
      max: 4
    }
  }
});

// campusId will be added automatically by association (belongsTo)

module.exports = Student;
