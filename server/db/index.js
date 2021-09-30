const mongoose = require('mongoose')

const dbUrl = 'mongodb://localhost:27017/trackvac';

const db = mongoose.connection;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

module.exports = db;