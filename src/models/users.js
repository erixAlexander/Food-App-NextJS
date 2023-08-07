import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  pwd: { type: String, required: true },
  refreshToken: { type: String },
  createdDate: { type: Date, default: Date.now },
  address: { type: String },
});

const Users = mongoose.models.Users || mongoose.model("Users", userSchema);

export default Users;
