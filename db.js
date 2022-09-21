const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/crafted")
  .then(() => {
    console.log("connection of the db");
  })
  .catch((e) => {
    console.log(e, "error");
  });
