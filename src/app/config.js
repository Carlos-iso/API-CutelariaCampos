const dotenv = require("dotenv").config();

const saltKey = process.env.SALT_KEY;
const mongodbUsername = process.env.MONGODB_USERNAME;
const mongodbPassword = process.env.MONGODB_PASSWORD;
const mongodbCluster = process.env.MONGODB_CLUSTER;
const mongodbNet = process.env.MONGODB_NET;
const mongodbDataBase = process.env.MONGODB_DATABASE;

global.SALT_KEY = saltKey;

module.exports = {
  connectionString: `mongodb+srv://${mongodbUsername}:${mongodbPassword}@${mongodbCluster}.${mongodbNet}.mongodb.net/${mongodbDataBase}`,
};

async function createDocument(data) {
  // Generate a new UUID for the id field
  const id = uuid.v4();

  // Create a new document with the generated id and other fields
  const document = new Model({
    id: id,
    name: data.name,
    email: data.email,
    password: data.password,
  });

  // Save the document to the database
  try {
    await document.save();
    console.log(`Created document with id: ${id}`);
    return document;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
