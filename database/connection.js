const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    // mongodb connection string
    const con = await mongoose.connect(process.env.MONGO_URI, {
      // this properties stop unwanted warning in the console
      // useNewUriParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
      // useCreateIndex: true
    });
    console.log(`MongoDB connected: ${con.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
