const mongoose = require("mongoose");
const DB =
  "mongodb+srv://Rikin_9504:Rikin1234@cluster0.bkoyg1m.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DB)
  .then(() => {
    console.log("connection of the db");
  })
  .catch((e) => {
    console.log(e, "error");
  });
