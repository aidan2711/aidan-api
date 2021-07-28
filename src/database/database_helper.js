const mongoose = require("mongoose");
const db = require("./mongoDB");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

module.exports.connectMongoDB = function() {
    mongoose
        .connect(db.mongoURI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.error(err));
};

