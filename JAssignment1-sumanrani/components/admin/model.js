const mongoose = require("mongoose");
const { scryptSync } = require("crypto");
const db = require("../../db");

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const Admin = mongoose.model("Admin", AdminSchema);

async function authenticateAdmin(username, password) {
  await db.connect();
  const hashedPassword = scryptSync(password, process.env.SALT, 64).toString("base64");
  const admin = await Admin.findOne({ username, password: hashedPassword });
  return !!admin;
}

async function addAdmin(username, password) {
  await db.connect();
  // Check if the admin already exists
  const existing = await Admin.findOne({ username });
  if (existing) return false;
  const hashedPassword = scryptSync(password, process.env.SALT, 64).toString("base64");
  const newAdmin = new Admin({ username, password: hashedPassword });
  return await newAdmin.save();
}

module.exports = {
  authenticateAdmin,
  addAdmin
};
