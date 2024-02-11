const mongoose = require('mongoose');

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.DB_URI);
  
      console.log("connexion a Mongodb reussie...");
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
};

module.exports = connectDB;