const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database/connection");

const app = express();

dotenv.config();
const PORT = process.env.PORT || 8080;

// mongodb connection
connectDB();

app.use(express.json());

// load routes
app.use("/", require("./routes/user"));
app.use("/hospital", require("./routes/hospital"));
app.use("/receiver", require("./routes/receiver"));

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}!`));
