const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const ATLAS_MONGO_SERVER = process.env.ATLAS_MONGO_SERVER || "localhost";

let server;
app.use(cors());
app.use(express.json());
app.use("/", routes);
app.get("/", (req, res) => {
  res.send("Server is running");
});
mongoose.connect(ATLAS_MONGO_SERVER).then(() => {
  console.log("Connected To MongoDb");
  server = app.listen(PORT, () => {
    console.log("Server is running on" + PORT);
  });
});
