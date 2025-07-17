const mongoose = require("mongoose");

const passwordSchema = new mongoose.Schema({
  id: { type: String, required: true },
  site: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
});


module.exports = mongoose.model("Password", passwordSchema, "Passwords");
