const mongoose = require('mongoose');

mongoose.connect(
// This is the port that is used to actually connect to compass.
    process.env.MONGODB_URI ||   "mongodb://127.0.0.1:27017/networkDB",
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
);

mongoose.set('debug', true);

module.exports = mongoose.connection;