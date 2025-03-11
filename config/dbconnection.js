const mongooese = require("mongoose");

//Here we make database connection using env file where we stored our Mongodb cluster link, We called usig async and await function so that until it gets the response, it will pause further procedure.
// Also there is try catch block for handelling error efficiently.
const connectDb = async ()=> {
    try {
        const connect = await mongooese.connect(process.env.CONNECTION_STRING);
        console.log("Database Connection successfully", connect.connection.host, connect.connection.name);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDb;