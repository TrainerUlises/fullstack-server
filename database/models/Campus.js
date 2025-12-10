/*==================================================
/database/models/Campus.js
==================================================*/
const Sequelize = require('sequelize');  
const db = require('../db');

const Campus = db.define("campus", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  address: {
    type: Sequelize.STRING,
    allowNull: false
  },

  description: {
    type: Sequelize.STRING
  },

  // Used for images
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://via.placeholder.com/300",
  }
});

module.exports = Campus;
