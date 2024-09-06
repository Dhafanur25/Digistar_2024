// Server setting
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

let users = [];
app.use(bodyParser.json());

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// GET endpoint to retrieve all users
app.get("/users", (req, res) => {
  res.json(users);
});

// POST endpoint to create a new user with unique id
app.post("/users", (req, res) => {
  const user = req.body;
  const existingUser = users.find((u) => u.id === user.id);

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with this ID already exists" });
  }

  users.push(user);
  res.status(201).json(user);
});

// PUT endpoint to update an existing user by ID
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = req.body;
  users = users.map((u) => (u.id === id ? user : u));
  res.json(user);
});

// DELETE endpoint to remove a user by ID
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  users = users.filter((u) => u.id !== id);
  res.status(204).end();
});

// GET endpoint to search for users by name
app.get("/users/search", (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res
      .status(400)
      .send({ message: "Name query parameter is required" });
  }

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(name.toLowerCase())
  );

  res.json(filteredUsers);
});
