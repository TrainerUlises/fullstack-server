/*==================================================
/database/utils/configDB.js
==================================================*/

require("dotenv").config();

// Read DB values from .env instead of hardcoding!
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPwd = process.env.DB_PASSWORD;

module.exports = {
  dbName,
  dbUser,
  dbPwd
};

