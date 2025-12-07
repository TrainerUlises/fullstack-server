/*==================================================
/app.js

This is the top-level (main) file for the server application.
It is the first file to be called when starting the server application.
It initiates all required parts such as Express, routes, database, etc.
==================================================*/

// Load environment variables from .env file
require("dotenv").config();

/* SET UP DATABASE */
// Import database setup utilities
const createDB = require('./database/utils/createDB');  // Create DB if needed
const seedDB = require('./database/utils/seedDB');      // Seed DB
const db = require('./database');                       // Sequelize instance

/* MODEL SYNCHRONIZATION & DATABASE SEEDING */
const syncDatabase = async () => {
  try {
    // Sync all models (drop tables first, then recreate)
    await db.sync({ force: true });
    console.log('------ Synced to db --------');

    // Seed DB
    await seedDB();
    console.log('-------- Successfully seeded db --------');
  } catch (err) {
    console.error('syncDB error:', err);
  }
};

/* SET UP EXPRESS APPLICATION */
const express = require("express");
const app = express();

/* SET UP ROUTES */
const apiRouter = require('./routes/index');

/* CONFIGURE EXPRESS APPLICATION */
const configureApp = async () => {
  // Middleware for parsing incoming data
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Attach API routes under "/api"
  app.use("/api", apiRouter);

  // Handle 404 errors
  app.use((req, res, next) => {
    const error = new Error("Not Found, Please Check URL!");
    error.status = 404;
    next(error);
  });

  // Error-handling middleware
  app.use((err, req, res, next) => {
    console.error(err);
    console.log(req.originalUrl);
    res.status(err.status || 500).send(err.message || "Internal server error.");
  });
};

/* START SERVER BOOT PROCESS */
const bootApp = async () => {
  await createDB();          // Ensure database exists
  await syncDatabase();      // Sync + seed
  await configureApp();      // Configure express
};

/* RUN SERVER BOOT */
bootApp();

/* ACTIVATE SERVER PORT */
const PORT = 5001;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
