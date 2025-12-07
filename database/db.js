/*==================================================
/database/db.js
==================================================*/

require("dotenv").config();
const Sequelize = require('sequelize');

// Load values directly from .env
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPwd  = process.env.DB_PASSWORD;

console.log('Opening database connection');

const db = new Sequelize(dbName, dbUser, dbPwd, {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  dialect: 'postgres',
  logging: false
});

module.exports = db;
