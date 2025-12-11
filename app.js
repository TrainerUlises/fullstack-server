/*==================================================
/app.js

Top-level server file. Initializes database, seeds data,
sets up Express routes, serves static files, and starts server.
==================================================*/

const path = require("path");

// Load environment variables
require("dotenv").config();

/* ================================
   DATABASE SETUP
================================= */
const createDB = require("./database/utils/createDB");
const seedDB = require("./database/utils/seedDB");
const db = require("./database"); // Sequelize instance

// Sync and seed database
const syncDatabase = async () => {
  try {
    await db.sync({ force: true });
    console.log("------ Synced to db --------");

    await seedDB();
    console.log("-------- Successfully seeded db --------");
  } catch (err) {
    console.error("syncDB error:", err);
  }
};

/* ================================
   EXPRESS APPLICATION SETUP
================================= */
const express = require("express");
const app = express();

// 🔥 Serve static files from client/public
// This enables /images/campuses/*.jpg to load in the browser
app.use(express.static(path.join(__dirname, "../client/public")));

/* ================================
   ROUTES
================================= */
const apiRouter = require("./routes/index");

const configureApp = async () => {
  // Parse JSON + URL-encoded bodies
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Mount API routes
  app.use("/api", apiRouter);

  // 404 handler
  app.use((req, res, next) => {
    const error = new Error("Not Found, Please Check URL!");
    error.status = 404;
    next(error);
  });

  // General error handler
  app.use((err, req, res, next) => {
    console.error(err);
    console.log("Error on:", req.originalUrl);
    res.status(err.status || 500).send(err.message || "Internal server error.");
  });
};

/* ================================
   SERVER BOOT PROCESS
================================= */
const bootApp = async () => {
  await createDB();      // Ensure DB exists
  await syncDatabase();  // Sync & seed
  await configureApp();  // Configure Express
};

bootApp();

/* ================================
   ACTIVATE SERVER
================================= */
const PORT = 5001;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
