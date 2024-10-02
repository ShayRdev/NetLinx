const mongoose = require('mongoose');
const Grid = require('gridfs-stream'); // Import gridfs-stream

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
});

// Initialize GridFS after the connection is established
let gfs;

db.on('open', () => {
  gfs = Grid(db.db, mongoose.mongo); // Create a GridFS stream
  console.log('GridFS initialized');
});

// Export the database connection and gfs
module.exports = { db, gfs };
