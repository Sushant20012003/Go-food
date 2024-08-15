const mongoose = require('mongoose');

// Replace the placeholder values with your actual MongoDB Atlas credentials and cluster information
const uri = "mongodb+srv://sushant20012003:Sher%40123@cluster0.jn0rn.mongodb.net/Go-food?retryWrites=true&w=majority";

mongoose.connect(uri)
.then(() => console.log('Successfully connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB Atlas', err));