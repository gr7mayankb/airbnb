const mongoose = require('mongoose')

const dbConnect = () => {

    mongoose.connect(process.env.MONGO_URL, {
        dbName: "booking-database",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("DataBase Connected");
    }).catch((e) => {
        console.log(e);
    });

};

module.exports = dbConnect;