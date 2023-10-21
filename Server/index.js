const express = require("express");
const cors = require("cors");
const db = require("./db.js");
const app = express();
const env = require("dotenv").config();
const taskrouter = require("./Router/taskRouter");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/", taskrouter);


app.listen(process.env.PORT, () => {
  console.log(`Server start on Port ${process.env.PORT}`);
});
