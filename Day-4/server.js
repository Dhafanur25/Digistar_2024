const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

const mongodb = require("./database/mongodb/db");
const userQuery = require("./database/mongodb/query");

mongodb.connectDB();

// Initialize an array to store user data
let users = [];

// Middleware to parse JSON bodies
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Route to GET all users - returns the users array as JSON
app.get("/users", (req, res) => {
  userQuery
    .getUsers()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// Route to GET a single user by index
app.get("/users/:id", (req, res) => {
  id = req.params.id;
  userQuery
    .getUser(id)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// Route to POST a new user - adds a new user to the users array
app.post("/users", (req, res) => {
  userQuery
    .createUser(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// Route to post multiple users
app.post("/multUsers", (req, res) => {
  if (!Array.isArray(req.body)) {
    return res
      .status(400)
      .json({ message: "Request body must be an array of users" });
  }

  userQuery
    .addUsers(req.body) // This should be a function to add multiple users
    .then((createdUsers) => {
      res.status(201).json(createdUsers); // Respond with the created users
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// Route to PUT (update) a user by index
app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  userQuery
    .updateUser(id, req.body)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// Route to DELETE a user by index
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  userQuery
    .deleteUser(id)
    .then((user) => {
      if (user) {
        res.json({ message: `User with id ${id} deleted successfully` });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// Route to search for a user by name
app.get("/search", (req, res) => {
  const name = req.query.name; // Directly access the name query parameter

  // Check if the name query parameter is provided
  if (!name) {
    return res
      .status(400)
      .send({ message: "Name query parameter is required" });
  }

  userQuery
    .findByName(name)
    .then((users) => {
      res.status(200).json(users); // Respond with the filtered users
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
