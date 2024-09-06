const mongoose = require("mongoose");
const schema = require("./schema");

const Users = mongoose.model("Users", schema.userSchema);

async function getUsers() {
  return await Users.find();
}

async function getUser(id) {
  return await Users.findById(id);
}

async function createUser(user) {
  return await Users.create(user);
}

async function addUsers(users) {
    return await Users.insertMany(users);
  }
  

async function updateUser(id, user) {
  return await Users.findByIdAndUpdate(id, user, { new: true });
}

async function deleteUser(id) {
  return await Users.findByIdAndDelete(id);
}

async function findByName(name) {
  const regex = new RegExp(name, "i");// 'i' for case insensitive
  return await Users.find({ name: regex });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  addUsers,
  updateUser,
  deleteUser,
  findByName,
};
