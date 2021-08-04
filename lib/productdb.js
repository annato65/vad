// Set up mongoose connection
const mongoose = require('mongoose');
let database_url = ('mongodb+srv://vad:anh19711@cluster0.21nu2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/myFirstDatabase');

// Connecting to the database
mongoose.connect(database_url, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => {
    console.log("Successfully connected to the product database");
}).catch(err => {
    console.log('Could not connect to the product database. Exiting now...', err);
    process.exit();
});

module.exports = mongoose.connection;