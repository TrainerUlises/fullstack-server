/*==================================================
/database/utils/seedDB.js

Seeds the database with initial campuses and students.
==================================================*/
const { Campus, Student } = require('../models');  // Import models

// Seed database
const seedDB = async () => {

  // ----- Create Campuses -----
const hunter = await Campus.create({
	name: "Hunter College",
	address: "695 Park Ave, New York, NY 10065",
	description: "This is a school in New York, New York.",
	imageUrl: "/images/campuses/HUNTER.jpg"
  });
  
  const queens = await Campus.create({
	name: "Queens College",
	address: "65-30 Kissena Blvd, Queens, NY 11367",
	description: "This is a school in Queens, New York.",
	imageUrl: "/images/campuses/QC_campus.jpg"
  });
  
  const brooklyn = await Campus.create({
	name: "Brooklyn College",
	address: "2900 Bedford Ave, Brooklyn, NY 11210",
	description: "This is a school in Brooklyn, New York.",
	imageUrl: "/images/campuses/2016_Brooklyn_College_campus.jpg"
  });
  
  const johnjay = await Campus.create({
	name: "John Jay College",
	address: "524 W 59th St, New York, NY 10019",
	description: "This is a school in Manhattan known for criminal justice.",
	imageUrl: "/images/campuses/johnjaycuny-1024x586.jpg"
  });

  // ----- Create Students WITH required fields -----
  await Student.create({
    firstname: "Joe",
    lastname: "Smith",
    email: "joe.smith@example.com",
    campusId: hunter.id
  });

  await Student.create({
    firstname: "Mary",
    lastname: "Johnson",
    email: "mary.johnson@example.com",
    campusId: queens.id
  });

  await Student.create({
    firstname: "Alice",
    lastname: "Brown",
    email: "alice.brown@example.com",
    campusId: brooklyn.id
  });

};

module.exports = seedDB;
